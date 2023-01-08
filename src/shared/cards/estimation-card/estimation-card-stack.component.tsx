import {
  Box,
  BoxProps,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

interface EstimationCardProps extends BoxProps {
  title: string;
  amount: number;
  units: string;
  delta?: number;
}

function Card({ title, amount, units, delta, ...rest }: EstimationCardProps) {
  return (
    <>
      <Box
        display={{ base: "none", sm: "none", md: "none", lg: "block" }}
        p={5}
        shadow="md"
        borderWidth="1px"
        width={250}
        height={150}
        backgroundColor="white"
        {...rest}
        className="estimation-box"
      >
        <Stat>
          <StatLabel pl={4}>{title}</StatLabel>
          <StatNumber p={5} fontWeight={700}>
            {amount} {units}
          </StatNumber>
          {delta && (
            <StatHelpText>
              {delta > 0 ? (
                <StatArrow type="increase" />
              ) : (
                <StatArrow type="decrease" />
              )}
              {delta}%
            </StatHelpText>
          )}
        </Stat>
      </Box>
      <Box
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
        p={5}
        shadow="md"
        borderWidth="1px"
        width={"auto"}
        height={100}
        backgroundColor="white"
        {...rest}
        className="estimation-box"
      >
        <Stat>
          <SimpleGrid columns={2}>
            <Box pt={2}>
              <StatLabel>{title}:</StatLabel>
              {delta && (
                <StatHelpText>
                  {delta > 0 ? (
                    <StatArrow type="increase" />
                  ) : (
                    <StatArrow type="decrease" />
                  )}
                  {delta}%
                </StatHelpText>
              )}
            </Box>
            <Box>
              <StatNumber fontSize={20}>
                {amount} {units}
              </StatNumber>
            </Box>
          </SimpleGrid>
        </Stat>
      </Box>
    </>
  );
}

function StackRow({ previous, estimation, current }: any) {
  return (
    <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={10}>
      <Card title="Previous Month" amount={previous} units="xyz" />
      <Card
        title="Current Month"
        amount={current[0]?.toString()}
        units="xyz"
        delta={current[1]}
      />
      <Card
        title="Estimation"
        amount={estimation[0]?.toString()}
        units="xyz"
        delta={estimation[1]}
      />
    </SimpleGrid>
  );
}

export default function EstimationCardsRow(props: any) {
  return (
    <StackRow
      previous={props.data.previous_period_total}
      estimation={props.data.next_period_total}
      current={props.data.current_period_total}
    />
  );
}
