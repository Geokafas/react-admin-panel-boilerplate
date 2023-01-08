import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Link as RouteLink,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "../../components/home/searchBar.component";
import companyLogo from "../../assets/logos/logo.png";

interface LinkItemProps {
  name: string;
  icon: IconType;
  linkTo: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, linkTo: "/dashboard" },
  { name: "Reports", icon: FiTrendingUp, linkTo: "/dashboard/reports" },
  { name: "Settings", icon: FiSettings, linkTo: "/dashboard/settings" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60}} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/200x80" />
        <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        LOGO
      </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkTo={link.linkTo} onClick={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  linkTo: string;
  children: ReactText;
}
const NavItem = ({ icon, linkTo, children, ...rest }: NavItemProps) => {
  return (
    <RouteLink to={linkTo} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </RouteLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
function MobileNav({ onOpen, ...rest }: MobileProps): any {
  const { auth, setAuth }: any = useAuth();
  let navigate = useNavigate();

  function handleSignOut() {
    sessionStorage.setItem("access_token", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("roles", "");
    sessionStorage.setItem("userDetails", "");
    setAuth({
      email: "",
      userId: "",
      roles: "",
      accessToken: "",
      userName: "",
      user_details: "",
    });
  }

  function handleMenuItemNavigate(to: string) {
    navigate("/dashboard/" + to);
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image display={{ base: "flex", md: "none" }} src="gibbresh.png" fallbackSrc="https://via.placeholder.com/200x80" />

      <HStack spacing={{ base: "0", md: "6" }}>
        <SearchBar />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={"https://bit.ly/broken-link"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {auth?.userName
                      ? auth?.userName
                      : sessionStorage.getItem("userName")}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {auth?.userId
                      ? auth?.userId
                      : sessionStorage.getItem("userId")}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => handleMenuItemNavigate("profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemNavigate("settings")}>
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
