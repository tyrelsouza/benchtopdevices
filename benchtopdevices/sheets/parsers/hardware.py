import re


def parse_instrument_info(text):
    instrument_info = {}
    # Regex pattern for key-value pairs in the instrument info section
    for line in text.split("\n")[2:]:
        if line:
            key, value = re.sub(r"\s\s+", "`", line.strip()).split("`")
            instrument_info[key.strip()] = value.strip()
    return instrument_info


def parse_ports(text):
    text = f"{text}\n\n"  # ensure extra newline to match on
    pattern = r"(Test Port \d)"
    matches = re.split(pattern, text)[1:]
    m = dict(list(zip(matches[0::2], matches[1::2])))
    calibration_data = {}
    for port, calibration in m.items():
        calibration_data[port] = parse_calibration_data(calibration)
    return calibration_data


KEEP = {
    "Mass Flow Trans": ("Instrument Flow", "Master Reading"),
    "Pressure Transducer": ("Instrument Pressure", "Master Value"),
}


def parse_calibration_data(text):
    # Regex pattern for each block in the calibration data section per Port
    pattern = r"(Mass Flow Trans|Pressure Transducer)\n(.+?)\n\n"
    matches = re.findall(pattern, text, re.DOTALL)
    calibration_data = {}
    for block_title, block_content in matches:
        lines = block_content.strip().split("\n")
        lines.pop(0)  # Go away =======
        device_name = lines.pop(0).strip().split(None, 1)[-1].strip()
        device_data = {"name": device_name}
        for line in lines:
            key, value = re.sub(r"\s\s+", "`", line.strip()).split("`")
            # Only keep the fields we want
            for start in KEEP[block_title]:
                key = key.strip()
                if key.startswith(start):
                    device_data[key] = value.strip()
        calibration_data[block_title] = device_data
    return calibration_data


def parse_hardware_calibration(content):
    # Split the content into instrument info and calibration data sections
    info_section, calibration_section = content.split(
        "|| Hardware Calibration Report ||"
    )

    instrument_info = parse_instrument_info(info_section)
    calibration_data = parse_ports(calibration_section)

    return {"instrument": instrument_info, "calibration": calibration_data}


if __name__ == "__main__":
    file_path = "./hardware_calibration.txt"  # Replace with the actual file path
    with open(file_path, "r") as file:
        content = file.read()
    data = parse_file(file_path)
