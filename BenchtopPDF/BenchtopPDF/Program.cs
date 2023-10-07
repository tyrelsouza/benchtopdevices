using Newtonsoft.Json;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;


namespace BenchtopPDF
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            QuestPDF.Settings.License = LicenseType.Community;
            // TODO get json from file
            var data =
                @"{""Instrument"": ""CTS0JODFDASH"", ""Customer Name"": ""Anthony Souza"", ""Customer Address"": ""PO Box 357, West Chesterfield, NH 03466"", ""Control Number"": ""123123"", ""Serial Number"": ""123313"", ""Accuracy"": 0.5, ""Barometric Pressure"": 1013.25, ""Temperature"": 50.3, ""Humidity"": 27, ""Transducers"": [{""Accuracy"": 0.005, ""Part Number"": ""D34-442"", ""Value"": 115, ""Unit"": ""PSIA"", ""Limit ABS"": 575, ""Transducer Name"": ""1"", ""Transducer Type"": ""Pressure"", ""Gauge Reading"": [{""Value"": 0, ""In Range"": true, ""Delta"": 575}, {""Value"": 20002, ""In Range"": true, ""Delta"": 577}, {""Value"": 39997, ""In Range"": true, ""Delta"": 572}, {""Value"": 60010, ""In Range"": true, ""Delta"": 585}, {""Value"": 80001, ""In Range"": true, ""Delta"": 576}, {""Value"": 100002, ""In Range"": true, ""Delta"": 577}], ""Master Value"": [{""Low Limit"": -575, ""Master Value"": 0, ""High Limit"": 575}, {""Low Limit"": 19425, ""Master Value"": 20000, ""High Limit"": 20575}, {""Low Limit"": 39425, ""Master Value"": 40000, ""High Limit"": 40575}, {""Low Limit"": 59425, ""Master Value"": 60000, ""High Limit"": 60575}, {""Low Limit"": 79425, ""Master Value"": 80000, ""High Limit"": 80575}, {""Low Limit"": 99425, ""Master Value"": 100000, ""High Limit"": 100575}], ""Verify Date"": ""07/20/22"", ""Verify Time"": ""11:20:26""}, {""Accuracy"": 0.005, ""Part Number"": ""A12-221"", ""Value"": 250, ""Unit"": ""SCCM"", ""Limit ABS"": 1250, ""Transducer Name"": ""2"", ""Transducer Type"": ""Flow"", ""Gauge Reading"": [{""Value"": -82, ""In Range"": true, ""Delta"": 1168}, {""Value"": 24802, ""In Range"": true, ""Delta"": 1052}, {""Value"": 49664, ""In Range"": true, ""Delta"": 914}, {""Value"": 74836, ""In Range"": true, ""Delta"": 1086}, {""Value"": 99416, ""In Range"": true, ""Delta"": 666}, {""Value"": 125289, ""In Range"": true, ""Delta"": 1539}, {""Value"": 150205, ""In Range"": true, ""Delta"": 1455}, {""Value"": 175290, ""In Range"": true, ""Delta"": 1540}, {""Value"": 200165, ""In Range"": true, ""Delta"": 1415}, {""Value"": 224748, ""In Range"": true, ""Delta"": 998}, {""Value"": 249825, ""In Range"": true, ""Delta"": 1075}], ""Master Value"": [{""Low Limit"": -1250, ""Master Value"": 0, ""High Limit"": 1250}, {""Low Limit"": 23750, ""Master Value"": 25000, ""High Limit"": 26250}, {""Low Limit"": 48750, ""Master Value"": 50000, ""High Limit"": 51250}, {""Low Limit"": 73750, ""Master Value"": 75000, ""High Limit"": 76250}, {""Low Limit"": 98750, ""Master Value"": 100000, ""High Limit"": 101250}, {""Low Limit"": 123750, ""Master Value"": 125000, ""High Limit"": 126250}, {""Low Limit"": 148750, ""Master Value"": 150000, ""High Limit"": 151250}, {""Low Limit"": 173750, ""Master Value"": 175000, ""High Limit"": 176250}, {""Low Limit"": 198750, ""Master Value"": 200000, ""High Limit"": 201250}, {""Low Limit"": 223750, ""Master Value"": 225000, ""High Limit"": 226250}, {""Low Limit"": 248750, ""Master Value"": 250000, ""High Limit"": 251250}], ""Verify Date"": ""07/15/21"", ""Verify Time"": ""14:55:10""}]}
";
            var model = JsonConvert.DeserializeObject<Sheet>(data);

            var document = new SheetDocument(model);
            document.GeneratePdfAndShow();
        }
    }
}