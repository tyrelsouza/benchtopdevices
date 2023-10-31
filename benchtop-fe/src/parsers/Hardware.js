const isInRange = (value, masterValue) => {
    return (masterValue["Low Limit"] <= value && value <= masterValue["High Limit"]);
}
const calculateDelta = (value, lowLimit) => {
    return Math.abs(lowLimit - value);
}

function outOfTolerance(readings) {
    // Calculate Out of Tolerances
    for (const reading of readings) {
        reading["Out Of Tolerance"] = 0;
        if (reading["In Range"]) {
            // We are good.
            continue
        }
        reading["Out Of Tolerance"] = reading["Delta"];
    }
}

const parseInstrumentInfo = (text) => {
    const instrumentInfo = {};
    const lines = text.split("\r").slice(2);

    for (const line of lines) {
        if (line) {
            const [key, value] = line.trim().split(/\s\s+/);
            instrumentInfo[key.trim()] = value.trim();
        }
    }

    return instrumentInfo;
}

const parsePorts = (text, accuracy) => {
    text += "\n\n"; // Ensure extra newline to match on
    const pattern = /(Test Port \d)/g;
    const matches = text.split(pattern).slice(1);
    const portData = {};

    for (let i = 0; i < matches.length; i += 2) {
        const port = matches[i];
        const calibration = matches[i + 1];
        portData[port] = parseCalibrationData(calibration, accuracy);
    }

    return portData;
}

const ALL_KEEP = ['Verify Date', 'Verify Time', "Name"]
const KEEP = {
    "Mass Flow Trans": ["Instrument Flow", "Master Reading"],
    "Pressure Transducer": ["Instrument Pressure", "Master Value"],
};

function deviceDataToObj(lines, name, kind) {
    const keep = KEEP[kind]
    const deviceData = {
        "Name": name,
        "Master Values": {},
        "Gauge Reading": []
    };
    for (const line of lines) {
        const [key, value] = line.trim().split(/\s\s+/);
        const keyTrimmed = key.trim();
        for (const start of ALL_KEEP) {
            if (keyTrimmed.startsWith(start)) {
                deviceData[keyTrimmed] = value.trim();
            }
        }

        for (const start of keep) {
            if (keyTrimmed.startsWith(start)) {
                if (keyTrimmed.includes("Master")) {
                    // Master values occur twice, but due to the fact that this is
                    // editing KeyValues not Indexes, it will replace
                    // the masters with the second instance of these.
                    // No manual checks to skip the first.
                    deviceData["Master Values"][keyTrimmed] = {"v": value.trim()}
                } else {
                    deviceData["Gauge Reading"].push({"Value": value.trim()})
                }
            }
        }
    }
    // Because of the annoyances of two entries,
    // Loop through, merging the objects and deleting the old
    for (let i in deviceData["Gauge Reading"]) {
        i = parseInt(i)

        const key = (kind === "Mass Flow Trans") ? `Master Reading ${i + 1}` : `Master Value ${i + 1}`
        deviceData["Gauge Reading"][i]["Master Value"] = deviceData["Master Values"][key]["v"]
    }
    delete deviceData["Master Values"]
    return deviceData;
}

function calculateLimitsAndTolerances(calibrationDatum, accuracy) {
    let unit = null;
    let value = null;
    const match = calibrationDatum["Name"].match(/([0-9]+)([A-Z]+)/i);
    if (match) {
        [, value, unit] = match;
        value = parseInt(value);
    }

    let limit = accuracy * value * 1000
    for (const gr of calibrationDatum["Gauge Reading"]) {
        const master_value = parseInt(gr["Master Value"].split(" ")[0]) * 1000;
        gr["Low Limit"] = master_value - limit
        gr["Master Value"] = master_value
        gr["High Limit"] = master_value + limit
    }
    for (const gr of calibrationDatum["Gauge Reading"]) {
        const [val, unit] = gr["Value"].split(" ")
        const reading = parseInt(val) * 1000;

        gr["Value"] = reading; // Update the original, ignoring the units
        gr["Unit"] = unit;
        gr["In Range"] = isInRange(reading, gr["Master Value"])
        gr["Delta"] = calculateDelta(reading, gr["Low Limit"])
    }
    outOfTolerance(calibrationDatum["Gauge Reading"])
}

const parseCalibrationData = (text, accuracy) => {
    const pattern = /(Mass Flow Trans|Pressure Transducer)\r([\s\S]+?)\r\r/g;
    const matches = [...text.matchAll(pattern)];
    const calibrationData = {};
    let blockTitles = []

    for (const match of matches) {
        const blockTitle = match[1];
        blockTitles.push(blockTitle);
        const blockContent = match[2];
        const lines = blockContent.trim().split("\r");
        lines.shift(); // Remove "=======" line
        const deviceName = lines.shift().trim().split(/\s+/).slice(-1)[0].trim();

        calibrationData[blockTitle] = deviceDataToObj(lines, deviceName, blockTitle);
    }

    for (const bt of blockTitles) {
        calculateLimitsAndTolerances(calibrationData[bt], accuracy)
    }

    return calibrationData;
}

function parseHardwareCalibration(content, accuracy) {
    // hack because we can't be sure that the file will end in two newlines, so might as well force it to add two
    // this way if there's only zero or one, we can still regex match on that
    content += "\r\n\r\n"

    // Replace the newlines consistently on windows/linux
    content = content.replace(/\r\n/g, "\r").replace(/\n/g, "\r")
    const [instrument, ports] = content.split("|| Hardware Calibration Report ||");
    const instrumentInfo = parseInstrumentInfo(instrument);
    const portData = parsePorts(ports, accuracy);

    return {"Instrument": instrumentInfo, "Calibration": portData};
}

export default function ParseHardwareCalibration(content, accuracy) {

    return parseHardwareCalibration(content, accuracy);
}