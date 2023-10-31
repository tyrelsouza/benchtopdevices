const fs = require('fs');
import {readFiles} from "../utils/file_utils.js";
import ParseHardwareCalibration from "../Hardware"


// const file = fs.readFileSync("src/parsers/__tests__/hardware_calibration/hardware_calibration.txt", 'utf8')

describe("Test for all files", () => {
    let files = readFiles("src/parsers/__tests__/hardware_calibration/");
    for (const file of files) {
        test(`Can parse ${file.name}`, () => {
            const calibrations = ParseHardwareCalibration(file.content, 0.05);
            console.log(calibrations)
        })
    }
});

describe("Testing proper shape", () => {
    test("It outputs an array of arrays", () => {
        const content = fs.readFileSync("src/parsers/__tests__/hardware_calibration/smallest.txt", 'utf8');
        const calibrations = ParseHardwareCalibration(content, 0.05);
        expect(calibrations).toEqual(
            {
                "Calibration": {
                    "Test Port 1": {
                        "Mass Flow Trans": {
                            "Gauge Reading": [{
                                "Delta": 0,
                                "High Limit": 0,
                                "In Range": false,
                                "Low Limit": 0,
                                "Master Value": 0,
                                "Out Of Tolerance": 0,
                                "Unit": "sccm",
                                "Value": 0
                            }], "Name": "Custom", "Verify Date": "07/12/2022", "Verify Time": "10:54:56"
                        },
                        "Pressure Transducer": {
                            "Gauge Reading": [{
                                "Delta": 2250,
                                "High Limit": 2250,
                                "In Range": false,
                                "Low Limit": -2250,
                                "Master Value": 0,
                                "Out Of Tolerance": 2250,
                                "Unit": "psig",
                                "Value": 0
                            }], "Name": "45PSIA", "Verify Date": "07/12/2022", "Verify Time": "08:14:59"
                        }
                    },
                    "Test Port 2": {
                        "Mass Flow Trans": {
                            "Gauge Reading": [{
                                "Delta": 0,
                                "High Limit": 0,
                                "In Range": false,
                                "Low Limit": 0,
                                "Master Value": 0,
                                "Out Of Tolerance": 0,
                                "Unit": "sccm",
                                "Value": 0
                            }], "Name": "Custom", "Verify Date": "07/12/2022", "Verify Time": "11:01:54"
                        },
                        "Pressure Transducer": {
                            "Gauge Reading": [{
                                "Delta": 2250,
                                "High Limit": 2250,
                                "In Range": false,
                                "Low Limit": -2250,
                                "Master Value": 0,
                                "Out Of Tolerance": 2250,
                                "Unit": "psig",
                                "Value": -0
                            }], "Name": "45PSIA", "Verify Date": "07/12/2022", "Verify Time": "08:21:53"
                        }
                    },
                },
                "Instrument": {
                    "Date": "07/12/2022",
                    "Instrument Name": "Chassis2 Adult",
                    "Serial Number": "BBP1736",
                    "Time": "11:31:39"
                }
            }
        );
    })
});