import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Pie3D = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages", //Set the chart caption
        enableSmartLabels: "0",
        startingAngle: "0",
        showPercentValues: "1",
        decimals: "0",
        pieRadius: "45%",
        // paletteColors: "#f0db4f",
        // useDataPlotColorForLabels: "1",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Pie3D;
