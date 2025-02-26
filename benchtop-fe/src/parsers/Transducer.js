import {ONE_NEW_LINE, TWO_NEW_LINES} from "./utils/constants.js";
import {tr} from "date-fns/locale";

const isInRange = (index, value, masterValues) => {
    return (masterValues[index]["Low Limit"] <= value && value <= masterValues[index]["High Limit"]);
}

const calculateDelta = (index, value, masterValues) => {
    return Math.abs(masterValues[index]["Low Limit"] - value);
}

function processRemainingValues(key, transducerInfo, transducerType, val) {
    // Toss anything else where it belongs
    const [cleanKey, _] = key.split(/\W\d/);
    if (cleanKey in transducerInfo || key.includes(`Instrument ${transducerType}`)) {
        const value = parseInt(val.split(" ")[0]) * 1000;
        // special case Master to get the limits
        if (cleanKey.includes("Master")) {
            transducerInfo[cleanKey].push({
                "Low Limit": value - transducerInfo["Limit ABS"],
                "Master Value": value,
                "High Limit": value + transducerInfo["Limit ABS"],
            });
        }

        // Turn both Instrument Pressure and Instrument Flow to Gauge Reading
        else if (key.includes(`Instrument ${transducerType}`)) {
            transducerInfo["Gauge Reading"].push(value);
        } else {
            transducerInfo[cleanKey].push(value);
        }
    }
}

function extractInfo(filteredLines, transducerInfo, transducerType) {
    // Extract other information for the transducer
    for (const line of filteredLines) {
        const [key, val] = line.trim().split(/\s\s+/);
        if (key.includes("Verify Date")) {
            transducerInfo["Verify Date"] = val;
        } else if (key.includes("Verify Time")) {
            transducerInfo["Verify Time"] = val;
        } else {
            processRemainingValues(key, transducerInfo, transducerType, val);
        }
    }
}

function outOfTolerance(transducerInfo) {
    // Calculate Out of Tolerances
    for (const reading of transducerInfo["Gauge Reading"]) {
        reading["Out Of Tolerance"] = 0;
        if (!reading["In Range"]) {
            reading["Out Of Tolerance"] = reading["Delta"];
        }
    }
}

function doMerge(transducerInfo) {
    let idx = 0;
    while (transducerInfo["Master Value"].length > 0) {
        const mv = transducerInfo["Master Value"].shift()
        transducerInfo["Gauge Reading"][idx] = {...transducerInfo["Gauge Reading"][idx], ...mv}
        idx++;
    }
    delete transducerInfo["Master Value"] // clean up
}

function refactorData(transducerInfo) {
    const {['Gauge Reading']: gr, ...instrument} = transducerInfo
    return {
        "Instrument": instrument,
        "Gauge Reading": gr
    }
}

function parseSection(section, accuracy) {
    const lines = section.trim().split(ONE_NEW_LINE);
    const filteredLines = lines.filter((line) => !line.startsWith("==") && line !== "|| Transducer Verify Report ||");
    filteredLines.shift();

    // Extract the Transducer number and Transducer type
    const transducerLine = filteredLines.shift().trim();
    let [transducerName, partNumber] = transducerLine.split(/\s\s+/);

    // Get part number and values
    let value = null;
    let unit = null;
    let transducerType = null;
    if (partNumber !== "Custom") {
        partNumber = partNumber.split(" ")
        value = partNumber.pop();
        partNumber = partNumber.join(" ");
        const match = value.match(/([0-9]+)([A-Z]+)/i);
        if (match) {
            [, value, unit] = match;
            value = parseInt(value);
        }
        unit = unit.toUpperCase()
        if (unit === "SCCM" || unit === "LPM") {
            // SCCM and LPM are Flow
            transducerType = "Flow";
        } else if (unit === "PSIA" || unit === "PSID") {
            // PSIA and PSID are pressure
            transducerType = "Pressure";
        } else {
            // Unknown Unit.
            throw new Error(`Unknown Type of Test, do not know unit: ${unit}`)
        }
    }

    // Create an object to store the data for each transducer
    const transducerInfo = {
        "Accuracy": accuracy,
        "Value": value,
        "Unit": unit,
        "Part Number": partNumber,
        "Limit ABS": value * accuracy * 1000,
        "Transducer Name": transducerName,
        "Transducer Type": transducerType,
        "Master Value": [],
        "Gauge Reading": [],
        "Verify Date": "",
        "Verify Time": "",
    };

    extractInfo(filteredLines, transducerInfo, transducerType);

    // Once we have the readings and master values, we can do the math
    // Doing Map, so we can have the paired index between GaugeReading and Master Value
    transducerInfo["Gauge Reading"] = transducerInfo["Gauge Reading"].map((v, idx) => ({
        Value: v,
        "In Range": isInRange(idx, v, transducerInfo["Master Value"]),
        Delta: calculateDelta(idx, v, transducerInfo["Master Value"]),
    }));

    outOfTolerance(transducerInfo);
    doMerge(transducerInfo);
    return refactorData(transducerInfo);
}

function parseTransducer(content, accuracy) {
    if (!content.includes("Transducer Verify Report")) {
        throw new Error("Not a Transducer Verify Report")
    }
    accuracy = accuracy / 100.0; // Comes in as Percent
    const transducerData = [];

    // Split the content into sections based on the blank line
    const sections = content.trim().split(TWO_NEW_LINES);

    for (const section of sections) {
        // Split each section into lines
        const transducerInfo = parseSection(section, accuracy);

        transducerData.push(transducerInfo);
    }

    return transducerData;
}

export default function ParseTransducer(content, accuracy) {
    return parseTransducer(content, accuracy);
}