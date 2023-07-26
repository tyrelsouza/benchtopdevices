from decimal import *

import re


def in_range(index, value, master_values):
    return (
        master_values[index]["Low Limit"] <= value <= master_values[index]["High Limit"]
    )


def parse_transducer(content, accuracy):
    getcontext().prec = 6

    accuracy = Decimal(f"{accuracy/100.0}")  # Comes in as Percent 
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
        transducer_type = None
        if part_number != "Custom":
            value = part_number.split()[-1]
            part_number = part_number.split()[1]
            if value.endswith("SCCM"):
                transducer_type = "Flow"
            if value.endswith("PSIA"):
                transducer_type = "Pressure"

        # Create a dictionary to store the data for each transducer
        transducer_info = {
            "Accuracy": accuracy,
            "Part Number": part_number,
            "Value": value,
            "Transducer Name": transducer_name,
            "Transducer Type": transducer_type,
            # "Setpoint Pressure": [],
            "Instrument Pressure": [],
            "Master Value": [],
            "Instrument Flow": [],
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
            v = Decimal(value.split(" ")[0])
            key = re.match(r"(.*)\W(\d)", key)[1]
            if key in transducer_info:
                value = Decimal(value.split()[0])
                # special case Master to get the limits
                if "Master" in key:
                    hi = Decimal(Decimal(1.0) + accuracy)
                    lo = Decimal(Decimal(1.0) - accuracy)
                    transducer_info[key].append(
                        {
                            "Low Limit": lo,
                            "Value": value,
                            "High Limit": value * hi,
                        }
                    )
                else:
                    transducer_info[key].append(value)


        transducer_info[f"Instrument {transducer_type}"] = [
            {
                "Value": v,
                "In Range": in_range(idx, v, transducer_info["Master Value"]),
                "Delta":"TODO"
            }
            for idx, v in enumerate(transducer_info[f"Instrument {transducer_type}"])
        ]

        if transducer_type == "Flow":
            del transducer_info["Instrument Pressure"]
        elif transducer_type == "Pressure":
            del transducer_info["Instrument Flow"]
        transducer_data.append(transducer_info)

    return transducer_data


if __name__ == "__main__":
    from pprint import pprint

    file_path = "./transducer_verify.txt"
    with open(file_path, "r") as file:
        content = file.read()
    parsed_data = parse_transducer(content, 0.5)
    pprint(parsed_data)
