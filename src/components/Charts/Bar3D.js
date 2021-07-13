import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked", //Set the chart caption
        // subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
        xAxisName: "Repos", //Set the x-axis name
        xAxisNameFontSize: "16px",
        yAxisName: "Forks", //Set the y-axis name
        yAxisNameFontSize: "16px",
        showValues: "1",
        // numberSuffix: "K",
        // theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
