parseInstrumentInfo = (text) => {
  const instrumentInfo = {};
  const lines = text.split("\n").slice(2);

  for (const line of lines) {
      if (line) {
          const [key, value] = line.trim().split(/\s\s+/);
          instrumentInfo[key.trim()] = value.trim();
      }
  }

  return instrumentInfo;
}

parsePorts = (text) => {
  text += "\n\n"; // Ensure extra newline to match on
  const pattern = /(Test Port \d)/g;
  const matches = text.split(pattern).slice(1);
  const portData = {};

  for (let i = 0; i < matches.length; i += 2) {
      const port = matches[i];
      const calibration = matches[i + 1];
      portData[port] = parseCalibrationData(calibration);
  }

  return portData;
}

const KEEP = {
  "Mass Flow Trans": ["Instrument Flow", "Master Reading"],
  "Pressure Transducer": ["Instrument Pressure", "Master Value"],
};

parseCalibrationData = (text) => {
  const pattern = /(Mass Flow Trans|Pressure Transducer)\n([\s\S]+?)\n\n/g;
  const matches = [...text.matchAll(pattern)];
  const calibrationData = {};

  for (const match of matches) {
      const blockTitle = match[1];
      const blockContent = match[2];
      const lines = blockContent.trim().split("\n");
      lines.shift(); // Remove "=======" line
      const deviceName = lines.shift().trim().split(/\s+/).slice(-1)[0].trim();
      const deviceData = { name: deviceName };

      for (const line of lines) {
          const [key, value] = line.trim().split(/\s\s+/);
          const keyTrimmed = key.trim();

          for (const start of KEEP[blockTitle]) {
              if (keyTrimmed.startsWith(start)) {
                  deviceData[keyTrimmed] = value.trim();
              }
          }
      }

      calibrationData[blockTitle] = deviceData;
  }

  return calibrationData;
}

export default parseHardwareCalibration = (content, accuracy) => {
  const sections = content.split("|| Hardware Calibration Report ||");
  const instrumentInfo = parseInstrumentInfo(sections[0]);
  const calibrationData = parsePorts(sections[1]);

  return { instrument: instrumentInfo, calibration: calibrationData };
}