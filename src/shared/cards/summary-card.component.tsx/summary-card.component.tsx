import { Box, Heading, Progress, Stack, Text } from "@chakra-ui/react";
import { ISummaryCard } from "../../interfaces/interfaces";

function SummaryCardComponent({ title, amount, ...rest }: ISummaryCard) {
  return (
    <>
      <Heading fontSize="sm" fontWeight={100}>
        {title}
      </Heading>
      <Text mt={2} fontSize="sm" textAlign="start">
        <Progress value={amount} size="xs" colorScheme="teal" />
      </Text>
    </>
  );
}

function StackRows() {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      backgroundColor="white"
      className="estimation-box"
    >
      <Heading fontSize="xl" fontWeight={400} mb={4}>
        Summary
      </Heading>
      <Stack spacing={2} direction="column">
        <SummaryCardComponent title="Previous Month" amount={47} />
        <SummaryCardComponent title="Demand Prediction" amount={80} />
      </Stack>
    </Box>
  );
}

export default function SummaryCard() {
  return <StackRows />;
}
