import { Box } from "@chakra-ui/react";
import DonutChart from "../../charts/donut-chart/donut-chart.component";

function DonutChartitem() {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      backgroundColor="white"
      className="estimation-box"
    >
      <DonutChart />
    </Box>
  );
}

export default function DonutChartCard() {
  return <DonutChartitem />;
}
