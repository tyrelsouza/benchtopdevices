import {ONE_NEW_LINE, TWO_NEW_LINES} from "./utils/constants.js";

const isInRange = (value, masterValue) => {
    return (masterValue["Low Limit"] <= value && value <= masterValue["High Limit"]);
}
const calculateDelta = (value, masterValue) => {
    return Math.abs(masterValue["Low Limit"] - value);
}
function outOfTolerance(reading) {
    // Calculate Out of Tolerances
    for (const reading of reading) {
        reading["Out Of Tolerance"] = 0;
        if (!reading["In Range"]) {
            reading["Out Of Tolerance"] = reading["Delta"];
        }
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

function deviceDataToObj(lines, keep, name) {
    const deviceData = {
        "Name":name,
        "Master Values":[],
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
        // Master values occur twice, but due to the fact that this is
        // editing KeyValues not Indexes, it will replace
        // the masters with the second instance of these.
        // No manual checks to skip the first.
        for (const start of keep) {
            if (keyTrimmed.startsWith(start)) {
                if (keyTrimmed.includes("Master")) {
                    deviceData["Master Values"].push(
                        {
                            "Value": value.trim()
                        }
                    )
                } else {
                    deviceData["Gauge Reading"].push(
                        {
                            "Value": value.trim()
                        }
                    )
                }
            }
        }
    }
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
    for (const mv of calibrationDatum["Master Values"]) {
        const reading = parseInt(mv["Value"].split(" ")[0]) * 1000;
        mv["Low Limit"] = reading - limit
        mv["High Limit"] = reading + limit
        mv["Value"] = reading
    }
    for (const i in calibrationDatum["Gauge Reading"]) {
        let gr = calibrationDatum["Gauge Reading"][i];
        const mv = calibrationDatum["Master Values"][i];
        const [val, unit] = gr["Value"].split(" ")
        const reading = parseInt(val) * 1000;

        gr["Value"] = reading; // Update the original, ignoring the units
        gr["Unit"] = unit;
        gr["In Range"] = isInRange(reading, mv)
        gr["Delta"] = calculateDelta(reading, mv)

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

        calibrationData[blockTitle] = deviceDataToObj(lines, KEEP[blockTitle], deviceName);
    }

    for (const bt of blockTitles) {
        calculateLimitsAndTolerances(calibrationData[bt], accuracy)
    }

    return calibrationData;
}

function parseHardwareCalibration(content, accuracy) {
    content = content.replace(/\r\n/g, "\r").replace(/\n/g, "\r")
    const [instrument, ports] = content.split("|| Hardware Calibration Report ||");
    const instrumentInfo = parseInstrumentInfo(instrument);
    const portData = parsePorts(ports, accuracy);

    return {instrument: instrumentInfo, calibration: portData};
}

export default function ParseHardwareCalibration(content, accuracy) {
    return parseHardwareCalibration(content, accuracy);
}