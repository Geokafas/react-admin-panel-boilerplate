import {
    Box,
    Heading,
    Text,
    Link,
    Flex,
    useColorModeValue
  } from "@chakra-ui/react";
  
  const NotFound = () => {
    return (
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        direction="column"
      >
        <Heading color={useColorModeValue('teal.200', 'teal.700')} variant="brand" as='h1' size='4xl' noOfLines={1} >404</Heading>
        <Heading as="h1" size="xl">
          Oops, the page you're looking for doesn't exist
        </Heading>
        <Text mt={4}>
          Go back to the{" "}
          <Link color={useColorModeValue('teal.200', 'teal.700')} href="/dashboard">
            homepage
          </Link>{" "}
        </Text>
      </Flex>
    );
  };
  
  export default NotFound;