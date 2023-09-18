using System.Globalization;
using System.Linq;
using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace BenchtopPDF
{
    public class SheetDocument : IDocument
    {
        private static Image LogoImage { get; } = Image.FromFile("BenchTopLogo.png");
        private static Image CertImage { get; } = Image.FromFile("a2lp_cert.png");
        
        public Sheet Sheet { get; }

        public SheetDocument(Sheet model)
        {
            Sheet = model;
        }

        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;
        public DocumentSettings GetSettings()
        {
            return new DocumentSettings();
        }

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
                {
                    page.Margin(25);
                    
                    page.Header().Element(CustomHeader);
                    page.Content().Element(ComposeContent);
                    
                    page.Footer().Border(1).Padding(4).AlignLeft().Text(text =>
                    {
                        text.Span("Secondary Cal Device (For Environmental Data):\n\nUncertainty Statement: The accuracy of measurement is determined by the standards uncertainty, with a coverage factor of k=2 (confidence of roughly 95%).");
                    });
                });
        }

        void CustomHeader(IContainer container)
        {
            container.Row(row =>
            {

                row.ConstantItem(133).Image(LogoImage);
                row.RelativeItem().Stack(stack =>
                {
                    stack.Item().PaddingHorizontal(10).Column(column =>
                    {
                        column.Item().Text(text =>
                        {
                            text.Span("Customer:").FontSize(12);
                        });
                        column.Item().Text(text =>
                        {
                            text.Span("Onsite cal (yes/no):").FontSize(12);
                        });
                        column.Item().Text(text =>
                        {
                            text.Span("Control Doc#:").FontSize(12);
                        });
                        column.Item().Text(text =>
                        {
                            text.Span("Technician:").FontSize(12);
                            // text.Span($"{Sheet.IssueDate:d}");
                        });
                    });
                });
                row.ConstantItem(80).Image(CertImage);

            });

        }

        void ComposeContent(IContainer container)
        {
            container.PaddingVertical(0).Column(column =>
            {
                column.Item().Text(text =>
                {
                    text.Span("Calibration")
                        .FontSize(16)
                        .Bold()
                        .FontColor(Colors.Black);
                    text.AlignCenter();
            
                });   
                column.Spacing(20);

                column.Item().Row(row =>
                {
                    row.RelativeItem().Component(new InstrumentComponent());
                    row.ConstantItem(25);
                    row.RelativeItem().Component(new CalDeviceComponent());
                    row.ConstantItem(25);
                    row.RelativeItem().Component(new EnvironmentComponent());
                });

                foreach (var transducer in Sheet.Transducers) {
                    column.Item().Component(new TableComponent(transducer));
                }
            });
        }

        void ComposeTable(IContainer container)
        {
            
        }

        void ComposeComments(IContainer container)
        {
            container.ShowEntire().Background(Colors.Grey.Lighten3).Padding(10).Column(column => 
            {
                column.Spacing(5);
                column.Item().Text("Comments").FontSize(14).SemiBold();
                // column.Item().Text(Sheet.Comments);
            });
        }
    }
    
    public class InstrumentComponent : IComponent
    {
    
        public InstrumentComponent()
        {
        }
        
        public void Compose(IContainer container)
        {
            container.ShowEntire().Column(column =>
            {
                column.Spacing(2);
                column.Item().Text("Instrument").Underline();
                column.Item().Text("Model: ");
                column.Item().Text("Serial #:");
                column.Item().Text("Channel:");
                column.Item().Text("Transducer Model:");
                column.Item().Text("Transducer Span:");
            });
        }
    }
    
    
    
    public class CalDeviceComponent : IComponent
    {
    
        public CalDeviceComponent()
        {
        }
        
        public void Compose(IContainer container)
        {
            container.ShowEntire().Column(column =>
            {
                column.Spacing(2);
                column.Item().Text("Primary Cal Device:").Underline();
                column.Item().Text("Model:");
                column.Item().Text("Serial #:");
                column.Item().Text("Cal Date:");
                column.Item().Text("Cal Due Date:");
                column.Item().Text("Cert ID:");
                column.Item().PaddingBottom(5); 
            });
        }
    }
    
    
    
    
    public class EnvironmentComponent : IComponent
    {
        
        public void Compose(IContainer container)
        {
            container.ShowEntire().Column(column =>
            {
                column.Spacing(2);
    
                column.Item().Text("Cal Date:").Bold();
                column.Item().Text("Cal Due Date:").Bold();
                column.Item().Text("Environmental Data").Underline();
                column.Item().Text("Baro (Psi):");
                column.Item().Text("Temp (*F):");
                column.Item().Text("Humidity (%RF)");
                column.Item().PaddingBottom(5); 
            });
        }
    }
    
    public class TableComponent : IComponent
    {
        private Transducer t { get; }
    
        public TableComponent(Transducer tt)
        {
            t = tt;
        }
        
        public void Compose(IContainer container)
        {
            var headerStyle = TextStyle.Default.SemiBold();
            container
                .DefaultTextStyle(x => x.FontSize(10))
                .Border(1)
                .BorderColor(Colors.Grey.Lighten2)
                .Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.RelativeColumn();
                    columns.RelativeColumn();
                    columns.RelativeColumn();
                    columns.RelativeColumn();
                    columns.RelativeColumn();
                    columns.RelativeColumn();
                });
                
                table.Header(header =>
                {
                    // header.Cell().ColumnSpan(6).PaddingBottom(0).BorderBottom(1)
                    //     .BorderColor(Colors.Black).AlignCenter().Text($"Data (IN {t.Unit})");

                    header.Cell().AlignCenter().Text("Gauge Reading").Style(headerStyle);
                    header.Cell().AlignRight().Text("Accuracy (\u00b1 FS)").Style(headerStyle);
                    header.Cell().AlignRight().Text("Low Limit").Style(headerStyle);
                    header.Cell().AlignRight().Text("High Limit").Style(headerStyle);
                    header.Cell().AlignRight().Text("As Found (units)").Style(headerStyle);
                    header.Cell().AlignRight().Text("OOT").Style(headerStyle);
                    
                });

                for (var idx = 0; idx < t.GaugeReading.Count; idx++)
                {
                    var i = t.GaugeReading[idx];
                    var index = t.GaugeReading.IndexOf(i) + 1;
                    var masterValue = t.MasterValue[t.GaugeReading.IndexOf(i)];
                    var darken = (idx % 2 == 0);
                    MakeRow(table, index, masterValue, i.Value, i.Delta, darken);
                }
            });
        }

        private void MakeRow(TableDescriptor table, int index, MasterValue masterValue, int value, int delta, bool darken)
        {
            IContainer CellStyle(IContainer container)
            {
                if (darken)
                {
                    return container
                        .DefaultTextStyle(x => x.FontSize(8))
                        .Border(1)
                        .BorderColor(Colors.Grey.Lighten2)
                        .Background(Colors.Grey.Lighten3)
                        .Padding(2);
                }
                return container
                    .DefaultTextStyle(x => x.FontSize(8))
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .Padding(2);
            }

            /*
             * "Gauge Reading"
             * "Accuracy"
             * "Low Limit"
             * "High Limit"
             * "As Found"
             * "OOT"
             */

            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.Value / 1000.0:F3}");
            table.Cell().Element(CellStyle).AlignRight().Text("---");
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.LowLimit / 1000.0:F3}");
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.HighLimit / 1000.0:F3}");
            table.Cell().Element(CellStyle).AlignRight().Text($"{value / 1000.0:F3}");
            table.Cell().Element(CellStyle).AlignRight().Text($"{delta / 1000.0:F3}");
        }
        

    }
}