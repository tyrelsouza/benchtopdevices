import {readFiles} from "../utils/file_utils.js";

import ParseHardwareCalibration from "../Hardware"

// const file = fs.readFileSync("src/parsers/__tests__/hardware_calibration/hardware_calibration.txt", 'utf8')

describe("Test for all files", () => {
  let files = readFiles("src/parsers/__tests__/hardware_calibration/");
  for (const file of files) {
    test(`Can parse ${file.name}`, () => {
      const calibrations = ParseHardwareCalibration(file.content, 0.05);
      console.log(calibrations.calibration)
    })
  }
});

/*

? With hardware - is it still accuracy limits are 0.05% (or w.e specified) of `3LPM`

 */