import AreaChart from "../../shared/charts/line-chart/line-chart.component";
import {
  Box,
  Divider,
  GridItem,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import EstimationCardsRow from "../../shared/cards/estimation-card/estimation-card-stack.component";
import SummaryCard from "../../shared/cards/summary-card.component.tsx/summary-card.component";
import DonutChartCard from "../../shared/cards/donut-chart-card/donut-chart-card.component";
import UserTable from "../../shared/tables/user-table/user-table.component";
import { useParams } from "react-router-dom";
import useGetHook from "../../shared/hooks/useGetHook";

export function Home() {
  const { id } = useParams();
  const { data, loading, error } = useGetHook({
    url: id ?? "/5b208333-44f9-422c-999d-d5a72ba9c233",
    has_device_id: id ? true : false,
  });
  const toast = useToast();
  const consumptionDataErrorToastId = "consumptionDataErrorToastId";
  if (error && !toast.isActive(consumptionDataErrorToastId) && loading) {
    toast({
      id: "consumptionDataErrorToastId",
      title: "Could not load consumption data",
      position: "top-right",
      isClosable: true,
      status: "error",
    });
  }
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} rowGap={10} columnGap={{ base: 0, md: 0, lg: 10 }}>
        <GridItem colSpan={2}>
          <AreaChart data={data} />
        </GridItem>
        <Box >
          <Stack>
            <Box minWidth={288}>
              <SummaryCard />
            </Box>
            <Divider />
            <Box minWidth={288}>
              <DonutChartCard />
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing="40px" mt={4}>
        <Box maxW={'48rem'} >
          <EstimationCardsRow data={data} />
        </Box>
        <Box>
          <UserTable />
        </Box>
      </SimpleGrid>
    </>
  );
}
