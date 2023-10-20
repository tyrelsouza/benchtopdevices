const twoNewLines = /\r\n\r\n|\r\r|\n\n/;
const oneNewLine = /\r\n|\r|\n/;

const inRange = (index, value, masterValues) => {
  return (
      masterValues[index]["Low Limit"] <= value && value <= masterValues[index]["High Limit"]
  );
}

const delta = (index, value, masterValues) => {
  return Math.abs(masterValues[index]["Low Limit"] - value);
}

export default function parseTransducer(content, accuracy){
  accuracy = accuracy / 100.0; // Comes in as Percent
  const transducerData = [];

  // Split the content into sections based on the blank line
  const sections = content.trim().split(twoNewLines);

  for (const section of sections) {
      // Split each section into lines
      const lines = section.trim().split(oneNewLine);
      const filteredLines = lines.filter(
          (line) => !line.startsWith("==") && line !== "|| Transducer Verify Report ||"
      );
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
          // SCCM and LPM are Flow
          if (unit === "SCCM" || unit === "LPM") {
              transducerType = "Flow";
          }
          // PSIA and PSID are pressure
          if (unit === "PSIA" || unit === "PSID") {
              transducerType = "Pressure";
          }
      }

      // Create an object to store the data for each transducer
      const transducerInfo = {
          Accuracy: accuracy,
          "Part Number": partNumber,
          Value: value,
          Unit: unit,
          "Limit ABS": value * accuracy * 1000,
          "Transducer Name": transducerName,
          "Transducer Type": transducerType,
          "Gauge Reading": [],
          "Master Value": [],
          "Verify Date": "",
          "Verify Time": "",
      };

      // Extract other information for the transducer
      for (const line of filteredLines) {
          const [key, val] = line.trim().split(/\s\s+/);
          if (key.includes("Verify Date")) {
              transducerInfo["Verify Date"] = val;
          } else if (key.includes("Verify Time")) {
              transducerInfo["Verify Time"] = val;
          } else {
              // Toss anything else where it belongs
              const [cleanKey, _] = key.split(/\W\d/);
              if (cleanKey in transducerInfo || key.includes(`Instrument ${transducerType}`)) {
                  const value = parseInt(val.split(" ")[0]) * 1000;
                  // special case Master to get the limits
                  if (cleanKey.includes("Master")) {
                      const hi = value + transducerInfo["Limit ABS"];
                      const lo = value - transducerInfo["Limit ABS"];
                      transducerInfo[cleanKey].push({
                          "Low Limit": lo,
                          "Master Value": value,
                          "High Limit": hi,
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
      }

      // Once we have the readings and master values, we can do the math
      // Doing Map, so we can have the paired index between GaugeReading and Master Value
      transducerInfo["Gauge Reading"] = transducerInfo["Gauge Reading"].map((v, idx) => ({
          Value: v,
          "In Range": inRange(idx, v, transducerInfo["Master Value"]),
          Delta: delta(idx, v, transducerInfo["Master Value"]),
      }));

      // Calculate Out of Tolerances
      for (const reading of transducerInfo["Gauge Reading"]) {
          reading["Out Of Tolerance"] = 0;
          if (!reading["In Range"]) {
              reading["Out Of Tolerance"] = reading["Delta"];
          }
      }

      transducerData.push(transducerInfo);
  }

  return transducerData;
}