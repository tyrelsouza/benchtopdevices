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
            var data = "{\"Instrument\": \"CTS0JODFDASH\", \"Customer Name\": \"Anthony Souza\", \"Customer Address\": \"PO Box 357, West Chesterfield, NH 03466\", \"Control Number\": \"123123\", \"Serial Number\": \"123313\", \"Accuracy\": 0.5, \"Barometric Pressure\": 1013.25, \"Temperature\": 50.3, \"Humidity\": 27, \"Transducers\": [{\"Accuracy\": 0.005, \"Part Number\": \"D34-442\", \"Value\": \"115PSIA\", \"Transducer Name\": \"1\", \"Transducer Type\": \"Pressure\", \"Instrument Pressure\": [{\"Value\": 0, \"In Range\": true, \"Delta\": 0}, {\"Value\": 20002, \"In Range\": true, \"Delta\": 102}, {\"Value\": 39997, \"In Range\": true, \"Delta\": 197}, {\"Value\": 60010, \"In Range\": true, \"Delta\": 310}, {\"Value\": 80001, \"In Range\": true, \"Delta\": 401}, {\"Value\": 100002, \"In Range\": true, \"Delta\": 502}], \"Master Value\": [{\"Low Limit\": 0, \"Master Value\": 0, \"High Limit\": 0}, {\"Low Limit\": 19900, \"Master Value\": 20000, \"High Limit\": 20099}, {\"Low Limit\": 39800, \"Master Value\": 40000, \"High Limit\": 40199}, {\"Low Limit\": 59700, \"Master Value\": 60000, \"High Limit\": 60299}, {\"Low Limit\": 79600, \"Master Value\": 80000, \"High Limit\": 80399}, {\"Low Limit\": 99500, \"Master Value\": 100000, \"High Limit\": 100499}], \"Verify Date\": \"07/20/22\", \"Verify Time\": \"11:20:26\"}, {\"Accuracy\": 0.005, \"Part Number\": \"A12-221\", \"Value\": \"250SCCM\", \"Transducer Name\": \"2\", \"Transducer Type\": \"Flow\", \"Master Value\": [{\"Low Limit\": 0, \"Master Value\": 0, \"High Limit\": 0}, {\"Low Limit\": 24875, \"Master Value\": 25000, \"High Limit\": 25124}, {\"Low Limit\": 49750, \"Master Value\": 50000, \"High Limit\": 50249}, {\"Low Limit\": 74625, \"Master Value\": 75000, \"High Limit\": 75374}, {\"Low Limit\": 99500, \"Master Value\": 100000, \"High Limit\": 100499}, {\"Low Limit\": 124375, \"Master Value\": 125000, \"High Limit\": 125624}, {\"Low Limit\": 149250, \"Master Value\": 150000, \"High Limit\": 150749}, {\"Low Limit\": 174125, \"Master Value\": 175000, \"High Limit\": 175874}, {\"Low Limit\": 199000, \"Master Value\": 200000, \"High Limit\": 200999}, {\"Low Limit\": 223875, \"Master Value\": 225000, \"High Limit\": 226124}, {\"Low Limit\": 248750, \"Master Value\": 250000, \"High Limit\": 251249}], \"Instrument Flow\": [{\"Value\": -82, \"In Range\": false, \"Delta\": 82}, {\"Value\": 24802, \"In Range\": false, \"Delta\": 73}, {\"Value\": 49664, \"In Range\": false, \"Delta\": 86}, {\"Value\": 74836, \"In Range\": true, \"Delta\": 211}, {\"Value\": 99416, \"In Range\": false, \"Delta\": 84}, {\"Value\": 125289, \"In Range\": true, \"Delta\": 914}, {\"Value\": 150205, \"In Range\": true, \"Delta\": 955}, {\"Value\": 175290, \"In Range\": true, \"Delta\": 1165}, {\"Value\": 200165, \"In Range\": true, \"Delta\": 1165}, {\"Value\": 224748, \"In Range\": true, \"Delta\": 873}, {\"Value\": 249825, \"In Range\": true, \"Delta\": 1075}], \"Verify Date\": \"07/15/21\", \"Verify Time\": \"14:55:10\"}]}";
            var model = JsonConvert.DeserializeObject<Sheet>(data);

            var document = new SheetDocument(model);
                document.GeneratePdfAndShow();

        }
    }
}