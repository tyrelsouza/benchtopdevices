const fs = require('fs');
import ParseTransducer from "../Transducer"
import {readFiles} from "../utils/file_utils.js";


describe("Test for all files", () => {
    let files = readFiles("src/parsers/__tests__/transducer_verify/");
    for (const file of files) {
        test(`Can parse ${file.name}`, () => {
            const transducers = ParseTransducer(file.content, 0.05)
            expect(transducers.length).toBeGreaterThan(0)
            for (const transducer of transducers) {
                expect(transducer["Instrument"]).toHaveProperty("Part Number")
                expect(transducer["Instrument"]).toHaveProperty("Transducer Name")
                expect(transducer).toHaveProperty("Gauge Reading")
                expect(transducer).not.toHaveProperty("Master Value")

                expect(transducer["Gauge Reading"].length).toBeGreaterThan(0);
            }
        });
    }
});

describe("Testing actual calculations", () => {
    test("It can detect if out of tolerance", () => {
        const content = fs.readFileSync("src/parsers/__tests__/transducer_verify/Blackbelt with flow 220601_143736 Transducer Verify.txt", 'utf8');
        const transducers = ParseTransducer(content, 0.05);
        for (const transducer of transducers) {
            let atLeastOneOOT = false;
            for (const gauge of transducer["Gauge Reading"]) {
                if (!gauge["In Range"]) {
                    atLeastOneOOT = true;
                    expect(gauge["Out Of Tolerance"]).toBeGreaterThan(0)
                }
            }
            expect(atLeastOneOOT).toBeTruthy();
        }
    })
});

describe("Testing Errors", () => {
    test("Not a Transducer Verify Report", () => {
        const e = () => {
            ParseTransducer("I am a Fish", 0.05)
        }
        expect(e).toThrowError(Error("Not a Transducer Verify Report"))
    })
    test("Unknown Unit", () => {
        const e = () => {
            ParseTransducer(`|| Transducer Verify Report ||\nTRANSDUCER1\n===============================================================\nTransducer 1               CTS D34-442 115FigNewtons`, 0);
        }
        expect(e).toThrowError(Error("Unknown Type of Test, do not know unit: FIGNEWTONS"))
    })
})

describe("Testing proper shape", () => {
    test("It outputs an array of arrays", () => {
        const content = fs.readFileSync("src/parsers/__tests__/transducer_verify/smallest.txt.txt", 'utf8');
        const transducers = ParseTransducer(content, 0.05);
        expect(transducers).toEqual(
            [
                {
                    Instrument: {
                        Accuracy: 0.0005,
                        Value: 115,
                        Unit: 'PSIA',
                        'Part Number': 'CTS D34-442',
                        'Limit ABS': 57.5,
                        'Transducer Name': 'Transducer 1',
                        'Transducer Type': 'Pressure',
                        'Verify Date': '07/20/22',
                        'Verify Time': '11:20:26'
                    },
                    'Gauge Reading': [
                        {
                            "Delta": 57.5,
                            "High Limit": 57.5,
                            "In Range": true,
                            "Low Limit": -57.5,
                            "Master Value": 0,
                            "Out Of Tolerance": 0,
                            "Value": 0,
                        },
                    ]
                },
                {
                    Instrument: {
                        Accuracy: 0.0005,
                        Value: 250,
                        Unit: 'SCCM',
                        'Part Number': 'CTS A12-221',
                        'Limit ABS': 125,
                        'Transducer Name': 'Transducer 2',
                        'Transducer Type': 'Flow',
                        'Verify Date': '07/15/21',
                        'Verify Time': '14:55:10'
                    },
                    'Gauge Reading': [
                        {
                            "Delta": 125,
                            "High Limit": 125,
                            "In Range": true,
                            "Low Limit": -125,
                            "Master Value": 0,
                            "Out Of Tolerance": 0,
                            "Value": -0,
                        },
                    ]
                }
            ]
        )
    })
});