import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../shared/hooks/useAuth";
import companyLogo from "../../assets/logos/logo.png";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function UserLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const { setAuth }: any = useAuth();
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.path || "/";

  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post<any>(
        "authenticate",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.access_token;
      const roles = response?.data?.user_id;
      const userName = response?.data.user_details.name;
      const userId = response?.data.user_details.id;
      const userDetails = response?.data.user_details;
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("roles", roles);
      sessionStorage.setItem("userDetails", userDetails);
      setAuth({ email, userId, roles, accessToken, userName, userDetails });
      setUser("");
      setPwd("");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        showMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
        showMessage("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
        showMessage("Unauthorized");
      } else {
        setErrMsg("Login Failed");
        showMessage("Login Failed");
      }
      errRef.current !== null ? errRef.current.focus() : "";
    }
  };

  function showMessage(errMsg: string) {
    toast({
      title: errMsg,
      position: "top-right",
      isClosable: true,
      status: "error",
    });
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={companyLogo}
          alt="logo"
          boxSize="55%"
          objectFit="cover"
        />
        <Heading
          color="purple"
          fontFamily="monospace"
          fontWeight="bold"
          mb="4"
        ></Heading>
        <p
          ref={errRef}
          style={{ color: errMsg ? "red" : "inherit" }}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default UserLoginPage;
