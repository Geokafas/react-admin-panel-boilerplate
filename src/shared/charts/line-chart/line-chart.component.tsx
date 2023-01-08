import HightChartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ICoordinates } from "../../interfaces/interfaces";

export default function AreaChart(props: any) {
  let liveData: ICoordinates[] = props.data.current_period.map((x: string) => {
    return [new Date(x[0]).getTime(), x[1]];
  });
  const options: Highcharts.Options = {
    title: {
      text: "Live Monitoring of data",
    },
    xAxis: {
      title: {
        text: "Date",
      },
      type: "datetime",
      labels: {
        format: "{value:%d/%m/%y}",
      },
    },
    yAxis: {
      title: {
        text: "dummy",
      },
    },
    series: [
      {
        type: "line",
        name: "dummy/Date",
        data: liveData,
      },
    ],
  };

  return <HightChartsReact highcharts={Highcharts} options={options} />;
}
