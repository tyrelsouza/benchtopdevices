const fs = require('fs');
import parseTransducer from "../Transducer"

const file = fs.readFileSync("src/parsers/__tests__/transducer_verify.txt", 'utf8')

test('Check if 1 equals 1', () => {
  const transducer = parseTransducer(file, 0.05)
  console.log(transducer)
});