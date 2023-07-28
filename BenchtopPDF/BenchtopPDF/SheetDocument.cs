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
        public static Image LogoImage { get; } = Image.FromFile("BenchTopLogo.jpg");
        
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
            container
                .Page(page =>
                {
                    page.Margin(50);
                    
                    page.Header().Element(ComposeHeader);
                    page.Content().Element(ComposeContent);
                    
                    page.Footer().AlignCenter().Text(text =>
                    {
                        text.CurrentPageNumber();
                        text.Span(" / ");
                        text.TotalPages();
                    });
                });
        }

        void ComposeHeader(IContainer container)
        {
            container.Row(row =>
            {
                row.RelativeItem().Column(column =>
                {
                    column
                        .Item().Text("Certificate Of Calibration")
                        .FontSize(20).SemiBold().FontColor(Colors.Blue.Medium);

                    column.Item().Text(text =>
                    {
                        text.Span("Issue date: ").SemiBold();
                        // text.Span($"{Sheet.IssueDate:d}");
                    });
                });

                row.ConstantItem(175).Image(LogoImage);
            });
        }

        void ComposeContent(IContainer container)
        {
            container.PaddingVertical(40).Column(column =>
            {
                column.Spacing(20);

                column.Item().Row(row =>
                {
                    row.RelativeItem().Component(new AddressComponent("From"));
                    row.ConstantItem(50);
                    row.RelativeItem().Component(new AddressComponent("For"));
                });

                foreach (var transducer in Sheet.Transducers) {
                    column.Item().Component(new TableComponent(transducer));
                }

            // var totalPrice = Sheet.Items.Sum(x => x.Price * x.Quantity);
                // column.Item().PaddingRight(5).AlignRight().Text($"Grand total: {totalPrice:C}").SemiBold();

                // if (!string.IsNullOrWhiteSpace(Sheet.Comments))
                    // column.Item().PaddingTop(25).Element(ComposeComments);
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
    
    public class AddressComponent : IComponent
    {
        private string Title { get; }
    
        public AddressComponent(string title)
        {
            Title = title;
        }
        
        public void Compose(IContainer container)
        {
            container.ShowEntire().Column(column =>
            {
                column.Spacing(2);
    
                column.Item().Text(Title).SemiBold();
                column.Item().PaddingBottom(5).LineHorizontal(1); 
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
            container.Table(table =>
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
                    header.Cell().Text("Point #").Style(headerStyle);
                    header.Cell().AlignRight().Text("Master Value").Style(headerStyle);
                    header.Cell().AlignRight().Text("Low Limit").Style(headerStyle);
                    header.Cell().AlignRight().Text("High Limit").Style(headerStyle);
                    header.Cell().AlignRight().Text("DUT").Style(headerStyle);
                    header.Cell().AlignRight().Text("Delta").Style(headerStyle);
                    
                    header.Cell().ColumnSpan(6).PaddingTop(5).BorderBottom(1).BorderColor(Colors.Black);
                });

                switch (t.TransducerType)
                {
                    case "Flow":
                    {
                        foreach (var flow in t.InstrumentFlow)
                        {
                            var index = t.InstrumentFlow.IndexOf(flow) + 1;
                            var masterValue = t.MasterValue[t.InstrumentFlow.IndexOf(flow)];

                            if (flow.InRange)
                            {
                                StandardRow(table, index, masterValue, flow.Value, flow.Delta);
                            }
                            else
                            {
                                OutOfRangeRow(table, index, masterValue, flow.Value, flow.Delta);
                            } 
                        }

                        break;
                    }
                    case "Pressure":
                    {
                        foreach (var pressure in t.InstrumentPressure)
                        {
                            var index = t.InstrumentPressure.IndexOf(pressure) + 1;
                            var masterValue = t.MasterValue[t.InstrumentPressure.IndexOf(pressure)];

                            if (pressure.InRange)
                            {
                                StandardRow(table, index, masterValue, pressure.Value, pressure.Delta);
                            }
                            else
                            {
                                OutOfRangeRow(table, index, masterValue, pressure.Value, pressure.Delta);
                            }                         }

                        break;
                    }
                }
            });
        }

        private void StandardRow(TableDescriptor table, int index, MasterValue masterValue, int value, int delta)
        {
            static IContainer CellStyle(IContainer container) => container
                .BorderBottom(1)
                .BorderColor(Colors.Transparent)
                .PaddingVertical(5);

            table.Cell().Element(CellStyle).Text($"{index}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.Value / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.LowLimit / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.HighLimit / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{value / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{delta / 1000.0}").FontSize(10);
        }
        
        private void OutOfRangeRow(TableDescriptor table, int index, MasterValue masterValue, int value, int delta)
        {
            static IContainer CellStyle(IContainer container) => container
                .BorderBottom(1)
                .BorderColor(Colors.Grey.Lighten3)
                .Background(Colors.Grey.Lighten3)
                .PaddingVertical(5);

            table.Cell().Element(CellStyle).Text($"{index}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.Value / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.LowLimit / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{masterValue.HighLimit / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{value / 1000.0}").FontSize(10);
            table.Cell().Element(CellStyle).AlignRight().Text($"{delta / 1000.0}").FontSize(10);
        }

    }
}