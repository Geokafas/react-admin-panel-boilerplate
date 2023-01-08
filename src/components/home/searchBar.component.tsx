import {
  Text,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Avatar,
  Box,
  CardHeader,
  Flex,
  Heading,
  Grid,
  GridItem,
  useToast,
  ListItem,
  useColorModeValue,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearch from "../../shared/hooks/useSearch";
import { ISearchUser } from "../../shared/interfaces/interfaces";
import useAuth from "../../shared/hooks/useAuth";
import { ChevronRightIcon } from "@chakra-ui/icons";

function searchArrayFunc(props: any, service: any): ISearchUser[] {
  let searchResults: ISearchUser[] = [];
  service(props);
  return searchResults;
}

function SearchResult(props: any) {
  const navigate = useNavigate();

  const handleSearchResultClick = (e: any) => {
    navigate("/dashboard:" + e);
    props.closeModal();
  };

  return (
    <Card>
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar size={"sm"} src={"https://bit.ly/broken-link"} />
          <Box>
            <Heading size="sm">user id: {props.auth.userId}</Heading>
            <p>user name:{props.auth.userName}</p>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody style={{ overflow: "hidden" }}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <p>supply No.:</p>
            <Text style={{ boxShadow: "none", fontSize: 13 }}>
              {props.details.supply.supply_nr}
            </Text>
          </GridItem>
          <GridItem colSpan={3} w="130%">
            <p>deviceIDs:</p>
            {props.details.devices ? (
              props.details.devices.map((device: any) => (
                <span>
                  <Text
                    style={{ boxShadow: "none", fontSize: 14 }}
                    onClick={() => {
                      handleSearchResultClick(device.ext_device_id);
                    }}
                    className="taglikehover"
                  >
                    <ChevronRightIcon boxSize={4} />
                    {device._id}
                  </Text>
                </span>
              ))
            ) : (
              <span>
                <Text
                  style={{ boxShadow: "none", fontSize: 14 }}
                  onClick={() => {
                    handleSearchResultClick(props.details.device.ext_device_id);
                  }}
                  className="taglikehover"
                >
                  <ChevronRightIcon boxSize={4} />
                  {props.details.device._id}
                </Text>
              </span>
            )}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}

function SearchBar() {
  const btnRef = React.useRef(null);
  const [results, setResArray] = useState<ISearchUser[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useState<string>("");
  const { data, error, loading, request } = useSearch(searchParams);
  const { auth, setAuth }: any = useAuth();
  const toast = useToast();
  const searchBarErrorToastId = "searchBarErrorToastId";
  function closeModal() {
    return onClose;
  }
  useEffect(() => {
    searchArrayFunc(searchParams, request);
  }, [searchParams]);

  useEffect(() => {
    if (data.length > 0) {
      setResArray(data);
    } else {
      setResArray([]);
    }
  }, [data]);

  if (error && !toast.isActive(searchBarErrorToastId) && loading) {
    toast({
      id: searchBarErrorToastId,
      title: "Could not get search results",
      position: "top-right",
      isClosable: true,
      status: "error",
    });
  }

  return (
    <>
      <Input
        focusBorderColor="teal.400"
        placeholder="Search for user data"
        ref={btnRef}
        onClick={onOpen}
      />
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Text pl={4} fontSize='md'>Get user/device data by:</Text>
            <UnorderedList pl={5} fontSize={14}  color={useColorModeValue('gray.500', 'gray.700')}>
              <ListItem>by user-id: xyz-132XXX</ListItem>
              <ListItem>by device/product/supply id: d920d2cf2d1daa13b9f8</ListItem>
            </UnorderedList>
            <Input
              focusBorderColor="teal.400"
              placeholder="Search for user data"
              onChange={(e) => setSearchParams(e.target.value)}
            />
          </ModalHeader>
          <ModalBody>
            {results.map((x) => (
              <SearchResult
                key={x.userId}
                details={x}
                closeModal={closeModal()}
                auth={auth}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default SearchBar;
