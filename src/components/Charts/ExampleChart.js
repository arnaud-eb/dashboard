import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ExampleChart = ({ data }) => {
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular", //Set the chart caption
        // subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
        xAxisName: "Repos", //Set the x-axis name
        yAxisName: "Stars", //Set the y-axis name
        numberSuffix: "K",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ExampleChart;
