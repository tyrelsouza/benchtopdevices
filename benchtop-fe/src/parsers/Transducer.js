inRange = (index, value, masterValues) => {
  return (
      masterValues[index]["Low Limit"] <= value && value <= masterValues[index]["High Limit"]
  );
}

delta = (index, value, masterValues) => {
  return Math.abs(masterValues[index]["Low Limit"] - value);
}

export default parseTransducer = (content, accuracy) => {
  accuracy = accuracy / 100.0; // Comes in as Percent
  const transducerData = [];

  // Split the content into sections based on the blank line
  const sections = content.trim().split("\n\n");

  for (const section of sections) {
      // Split each section into lines
      const lines = section.trim().split("\n");
      const filteredLines = lines.filter(
          (line) => !line.startsWith("==") && line !== "|| Transducer Verify Report ||"
      );
      filteredLines.shift();

      // Extract the Transducer number and Transducer type
      const transducerLine = filteredLines.shift().trim();
      const [, transducerName, partNumber] = transducerLine.split(null, 2);

      // Get part number and values
      let value = null;
      let unit = null;
      let transducerType = null;
      if (partNumber !== "Custom") {
          value = partNumber.split(" ").pop();
          partNumber = partNumber.split(" ")[1];
          const match = value.match(/([0-9]+)([A-Z]+)/i);
          if (match) {
              [, value, unit] = match;
              value = parseInt(value);
          }
          if (unit === "SCCM") {
              transducerType = "Flow";
          }
          if (unit === "PSIA") {
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
              const [, cleanKey] = key.split(/\W\d/);
              if (
                  cleanKey in transducerInfo ||
                  key.includes(`Instrument ${transducerType}`)
              ) {
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
      transducerInfo["Gauge Reading"] = transducerInfo["Gauge Reading"].map((v, idx) => ({
          Value: v,
          "In Range": inRange(idx, v, transducerInfo["Master Value"]),
          Delta: delta(idx, v, transducerInfo["Master Value"]),
      }));

      transducerData.push(transducerInfo);
  }

  return transducerData;
}