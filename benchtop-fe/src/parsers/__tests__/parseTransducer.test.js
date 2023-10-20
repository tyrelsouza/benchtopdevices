import {tr} from "date-fns/locale";

const fs = require('fs');
const path = require('path');
import parseTransducer from "../Transducer"

// const file = fs.readFileSync("src/parsers/__tests__/transducer_verify.txt", 'utf8')


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
      files.push({ filepath, name, ext, stat, content });
    }
  });
  return files;
}

describe("Test for all files", () => {
  let files = readFiles("src/parsers/__tests__/transducer_verify/");
  for (const file of files) {
    test(`Can parse ${file.name}`, () => {
      const transducers = parseTransducer(file.name, file.content, 0.05)

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
