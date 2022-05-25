import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  Box,
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MyInput } from "../components";
import { AuthContext, AuthContextType } from "../providers";
import Cookies from "js-cookie";

type Name = "username" | "password";

export default function SignIn() {
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType;

  const handleClick = () => setShow(!show);

  const onChange = (e: FormEvent) => {
    const uData = { ...userData };
    const el = e.target as HTMLInputElement;
    uData[el.name as Name] = el.value;
    setUserData(uData);
  };

  const onSubmit = async (e: FormEvent) => {
    // console.log(process.env.API_URL);
    e.preventDefault();
    try {
      const res = await fetch(process.env.API_URL + "auth-token/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (res.status === 400) {
        setError(true);
      }
      setAuth({ user: json });
      Cookies.set("auth", JSON.stringify({ user: json }), {
        secure: true,
        sameSite: "strict",
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    auth.user.token && router.push("/");
  }, [auth]);

  return auth.user.token ? null : (
    <>
      <Stack spacing={3} paddingLeft="10%" paddingRight="10%">
        <Heading as="h1" size="xl" mb={4}>
          SIGN IN
        </Heading>
        <Box color="red.800" as="form" onSubmit={onSubmit} onChange={onChange}>
          <VStack gridGap={3}>
            <div>
              <FormLabel htmlFor="username">Username</FormLabel>
              <MyInput
                pr="4.5rem"
                type="text"
                placeholder="Enter Username"
                name="username"
                id="username"
              />
            </div>
            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md" borderColor="#A9B7E0">
                <MyInput
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  id="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
            <div>
              <Input type="submit" value="Submit" bg="red.900" color="white" />
            </div>
          </VStack>
        </Box>
      </Stack>
      {error && (
        <>
          <br />
          <h1>Unable to Log In, Try Again.</h1>
        </>
      )}
    </>
  );
}
