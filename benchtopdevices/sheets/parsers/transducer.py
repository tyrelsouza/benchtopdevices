import re
import json
from pprint import pprint


def in_range(index, value, master_values):
    return (
        master_values[index]["Low Limit"] <= value <= master_values[index]["High Limit"]
    )


def delta(index, value, master_values):
    return abs(master_values[index]["Low Limit"] - value)


def parse_transducer(content, accuracy):
    accuracy = accuracy/100.0  # Comes in as Percent 
    transducer_data = []

    # Split the content into sections based on the blank line
    sections = content.strip().split("\n\n")

    for section in sections:
        # Split each section into lines
        lines = section.strip().split("\n")
        lines = [
            line.strip()
            for line in lines
            if not line.startswith("==") and line != "|| Transducer Verify Report ||"
        ]
        lines.pop(0)

        # Extract the Transducer number and Transducer type
        transducer_line = lines.pop(0).strip()
        _, transducer_name, part_number = transducer_line.split(None, 2)

        # Get part number and values
        value = None
        unit = None
        transducer_type = None
        if part_number != "Custom":
            value = part_number.split()[-1]
            part_number = part_number.split()[1]
            if match := re.match(r"([0-9]+)([A-Z]+)", value, re.I):
                value, unit = match.groups()
                value = int(value)
            if unit == "SCCM":
                transducer_type = "Flow"
            if unit == "PSIA":
                transducer_type = "Pressure"

        # Create a dictionary to store the data for each transducer
        transducer_info = {
            "Accuracy": accuracy,
            "Part Number": part_number,
            "Value": value,
            "Unit": unit,
            "Limit ABS": int(value * accuracy * 1000),
            "Transducer Name": transducer_name,
            "Transducer Type": transducer_type,
            "Gauge Reading": [],
            "Master Value": [],
            "Verify Date": "",
            "Verify Time": "",
        }

        # Extract other information for the transducer
        for line in lines:
            key, value = re.sub(r"\s\s+", ",", line.strip()).split(",")
            if "Verify Date" in key:
                transducer_info["Verify Date"] = value
                continue
            elif "Verify Time" in key:
                transducer_info["Verify Time"] = value
                continue

            # Toss anything else where it belongs
            key = re.match(r"(.*)\W(\d)", key)[1]
            if key in transducer_info or f"Instrument {transducer_type}" in key:
                value = int(float(value.split()[0])*1000)
                # special case Master to get the limits
                if "Master" in key:
                    hi = value + transducer_info["Limit ABS"]
                    lo = value - transducer_info["Limit ABS"]
                    transducer_info[key].append(
                        {
                            "Low Limit": int(lo),
                            "Master Value": value,
                            "High Limit": int(hi),
                        }
                    )
                # Turn both Instrument Pressure and Instrument Flow to Gauge Reading
                elif f"Instrument {transducer_type}" in key:
                    transducer_info["Gauge Reading"].append(value)
                else:
                    transducer_info[key].append(value)

        # Once we have the readings, and master values, we can do the math
        transducer_info["Gauge Reading"] = [
            {
                "Value": v,
                "In Range": in_range(idx, v, transducer_info["Master Value"]),
                "Delta": delta(idx, v, transducer_info["Master Value"])
            }
            for idx, v in enumerate(transducer_info["Gauge Reading"])
        ]

        transducer_data.append(transducer_info)

    return transducer_data


if __name__ == "__main__":
    from pprint import pprint
    file_path = "./transducer_verify.txt"
    with open(file_path, "r") as file:
        output = {
            "Instrument": "CTS0JODFDASH",
            "Customer Name": "Anthony Souza",
            "Customer Address": "PO Box 357, West Chesterfield, NH 03466",
            "Control Number": "123123",
            "Serial Number": "123313",
            "Accuracy": 0.5,
            "Barometric Pressure": 1013.25,
            "Temperature": 50.3,
            "Humidity": 27,
            "Transducers": parse_transducer(file.read(), 0.5)
        }
        print(json.dumps(output).replace('"', '""'))
        pprint(output)

