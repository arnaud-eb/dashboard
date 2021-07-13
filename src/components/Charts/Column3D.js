import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Column3D = ({ data }) => {
  const chartConfigs = {
    type: "column3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular", //Set the chart caption
        xAxisName: "Repos", //Set the x-axis name
        xAxisNameFontSize: "16px",
        yAxisName: "Stars", //Set the y-axis name
        yAxisNameFontSize: "16px",
        // numberSuffix: "K",
        showValues: "1",
        useDataPlotColorForLabels: "0",
        // theme: "fusion", //Set the theme for your chart
        // bgColor: "#2caeba",
      },
      // Chart Data - from step 2
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Column3D;
