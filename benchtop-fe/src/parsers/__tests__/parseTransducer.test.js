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

  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

  return files;
}

test('Can parse any Transducer Verify file', () => {
  let files = readFiles("src/parsers/__tests__/transducer_verify/");
  for (const file of files) {
    const transducer = parseTransducer(file.name, file.content, 0.05)
    console.log(transducer)
  }
});