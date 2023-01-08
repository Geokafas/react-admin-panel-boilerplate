import HightChartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "./donut-chart.component.scss";

const options: Highcharts.Options = {
  title: {
    text: "Active/Inactive users",
    align: "left",
    style:{
      color: "#333",
      fontSize: '17px'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      depth: 45,
      cursor: "pointer",
      showInLegend: true,
      dataLabels: {
        enabled: false,
      },
    },
  },
  chart:{
    height:200
  },
  legend: {
    layout: "vertical",
    align: "left",
    verticalAlign: "middle",
    x:0,
    y:0,
    itemMarginTop: 10,
    itemMarginBottom: 10,
    itemStyle: {
      color: '#333',
      fontSize: '10px'
    },
    itemHoverStyle: {
      color: 'teal'
    },
  },
  series: [
    {
      type: "pie",
      data: [
        ["Active", 6],
        ["Inactive", 4],
      ],
      center: ["70%", "40%"],
      innerSize: "70%",
      size: "100%",
    },
  ],
};

export default function DonutChart() {
  return (
    <HightChartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%" } }}
    />
  );
}
