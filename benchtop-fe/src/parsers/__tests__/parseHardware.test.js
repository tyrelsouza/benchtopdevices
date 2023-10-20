const fs = require('fs');
import parseHardwareCalibration from "../Hardware"

const file = fs.readFileSync("src/parsers/__tests__/hardware_calibration.txt", 'utf8')

test('parseHardwareCalibration', () => {
  const hardware = parseHardwareCalibration(file, 0.05)
  // console.log(hardware)
});