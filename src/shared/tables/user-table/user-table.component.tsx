import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

interface IData {
  headlist: string[];
  bodylist: string[];
}

export default function UserTable() {
  const data: IData = {
    headlist: ["Customer Name", "Registered addr", "Account type", "isActive"],
    bodylist: ["Jhon Doe", "24 street, Athens", "Corp", "true"],
  };
  return <UserTableItem headlist={data.headlist} bodylist={data.bodylist} />;
}

function UserTableItem({ headlist, bodylist }: IData) {
  return (
    <TableContainer>
      <Table
        variant="simple"
        bg={useColorModeValue("white", "gray.900")}
        border="2px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        colorScheme="teal"
      >
        <Thead backgroundColor="cyan.400">
          <Tr>
            <UserTableHeadItem content={headlist} />
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <UserTableBodyItem content={bodylist} />
          </Tr>
          <Tr>
            <UserTableBodyItem content={bodylist} />
          </Tr>
          <Tr>
            <UserTableBodyItem content={bodylist} />
          </Tr>
          <Tr>
            <UserTableBodyItem content={bodylist} />
          </Tr>
          <Tr>
            <UserTableBodyItem content={bodylist} />
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
interface IContent {
  content: string[];
}
function UserTableHeadItem({ content }: IContent) {
  return (
    <>
      {content.map((c) => {
        return (
          <Th color="white" key={c} fontSize="md">
            {c}
          </Th>
        );
      })}
    </>
  );
}

const UserTableBodyItem = ({ content }: IContent) => {
  return (
    <>
      {content.map((c) => {
        return <Td key={c}>{c}</Td>;
      })}
    </>
  );
};
