const fs = require('fs');
const path = require('path');
import parseTransducer from "../Transducer"


function readFiles(dir) {
    const files = [];

    fs.readdirSync(dir).forEach(filename => {
        const name = path.parse(filename).name;
        const ext = path.parse(filename).ext;
        const filepath = path.resolve(dir, filename);
        const stat = fs.statSync(filepath);
        const isFile = stat.isFile();

        if (isFile) {
            const content = fs.readFileSync(filepath, 'utf8');
            files.push({filepath, name, ext, stat, content});
        }
    });
    return files;
}

describe("Test for all files", () => {
    let files = readFiles("src/parsers/__tests__/transducer_verify/");
    for (const file of files) {
        test(`Can parse ${file.name}`, () => {
            const transducers = parseTransducer(file.content, 0.05)

            expect(transducers.length).toBeGreaterThan(0)
            for (const transducer of transducers) {
                expect(transducer).toHaveProperty("Part Number")
                expect(transducer).toHaveProperty("Transducer Name")
                expect(transducer).toHaveProperty("Gauge Reading")
                expect(transducer).toHaveProperty("Master Value")

                expect(transducer["Gauge Reading"].length).toBeGreaterThan(1);
                expect(transducer["Master Value"].length).toBe(transducer["Gauge Reading"].length);
            }
        });
    }
});

describe("Testing actual calculations", () => {
    test("It can detect if out of tolerance", () => {
        const content = fs.readFileSync("src/parsers/__tests__/transducer_verify/Blackbelt with flow 220601_143736 Transducer Verify.txt", 'utf8');
        const transducers = parseTransducer(content, 0.05);
        for (const transducer of transducers) {
            let anyOOT = false;
            for (const gauge of transducer["Gauge Reading"]) {
                if (!gauge["In Range"]) {
                    anyOOT = true;
                    expect(gauge["Out Of Tolerance"]).toBeGreaterThan(0)
                }
            }
            expect(anyOOT).toBeTruthy();
        }
    })
});

describe("Testing Errors", () => {
    test("Not a Transducer Verify Report", () => {
        const e = () => {
            parseTransducer("I am a Fish", 0.05)
        }
        expect(e).toThrowError(Error("Not a Transducer Verify Report"))
    })
    test("Unknown Unit", () => {
         const e = () => {
             parseTransducer(`|| Transducer Verify Report ||\nTRANSDUCER1\n===============================================================\nTransducer 1               CTS D34-442 115FigNewtons`, 0);
         }
        expect(e).toThrowError(Error("Unknown Type of Test, do not know unit: FigNewtons"))

    })
})