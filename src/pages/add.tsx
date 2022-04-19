import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    Link as ChakraLink,
    useColorMode, FormLabel, Input, InputGroup, InputRightElement, Stack, VStack
  } from "@chakra-ui/react";
  import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MyInput } from "../components"
import { AuthContext, AuthContextType } from "../providers"

  
  const Add = () => {
    const { colorMode } = useColorMode();
    const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });
  const handleClick = () => setShow(!show);
  
    return (
      <>
        <Box marginY={4}>
          <Heading textAlign="center">Add Book</Heading>
  
          <Box textAlign="center" marginTop={4}>
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
          </Box>
        </Box>
      </>
    );
  };
  
  export default Add;