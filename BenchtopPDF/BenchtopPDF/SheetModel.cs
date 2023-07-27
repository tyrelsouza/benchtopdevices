using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BenchtopPDF
{
    /// Sheet myDeserializedClass = JsonConvert.DeserializeObject<Sheet>(myJsonResponse);
    public class InstrumentFlow
    {
        public int Value { get; set; }

        [JsonProperty("In Range")]
        public bool InRange { get; set; }
        public int Delta { get; set; }
    }

    public class InstrumentPressure
    {
        public int Value { get; set; }

        [JsonProperty("In Range")]
        public bool InRange { get; set; }
        public int Delta { get; set; }
    }

    public class MasterValue
    {
        [JsonProperty("Low Limit")]
        public int LowLimit { get; set; }
        public int Value { get; set; }

        [JsonProperty("High Limit")]
        public int HighLimit { get; set; }
    }

    public class Sheet
    {
        public string Instrument { get; set; }

        [JsonProperty("Customer Name")]
        public string CustomerName { get; set; }

        [JsonProperty("Customer Address")]
        public string CustomerAddress { get; set; }

        [JsonProperty("Control Number")]
        public string ControlNumber { get; set; }

        [JsonProperty("Serial Number")]
        public string SerialNumber { get; set; }
        public double Accuracy { get; set; }

        [JsonProperty("Barometric Pressure")]
        public double BarometricPressure { get; set; }
        public double Temperature { get; set; }
        public int Humidity { get; set; }
        public List<Transducer> Transducers { get; set; }
    }

    public class Transducer
    {
        public double Accuracy { get; set; }

        [JsonProperty("Part Number")]
        public string PartNumber { get; set; }
        public string Value { get; set; }

        [JsonProperty("Transducer Name")]
        public string TransducerName { get; set; }

        [JsonProperty("Transducer Type")]
        public string TransducerType { get; set; }

        [JsonProperty("Instrument Pressure")]
        public List<InstrumentPressure> InstrumentPressure { get; set; }

        [JsonProperty("Master Value")]
        public List<MasterValue> MasterValue { get; set; }

        [JsonProperty("Verify Date")]
        public string VerifyDate { get; set; }

        [JsonProperty("Verify Time")]
        public string VerifyTime { get; set; }

        [JsonProperty("Instrument Flow")]
        public List<InstrumentFlow> InstrumentFlow { get; set; }
    }




    
}