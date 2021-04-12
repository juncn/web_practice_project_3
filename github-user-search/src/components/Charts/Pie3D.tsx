import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

interface PieChartData {
  label: string;
  value: string;
}

interface Props {
  data: PieChartData[];
}

const ExampleChart = ({ data }: Props) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages',
        theme: 'fusion',
        decimals: 0,
        pieRadius: '35%',
        palettecolors: 'f0db4f, 5d62b5, 29c3be'
      },
      // Chart Data
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
}

export default ExampleChart;