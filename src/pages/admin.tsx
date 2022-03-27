import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import React from "react";
import {
  Button,
  Box,
  Heading,
  IconButton,
  Text,
  Checkbox,
  CheckboxGroup,
  Select,
} from "@chakra-ui/react";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";

export default function LogIn() {
  const [show, setShow] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const handleClick = () => setShow(!show);

  const onChange = (e) => {
    const uData = { ...userData }
    uData[e.target.name] = e.target.value
    setUserData(uData)
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/api/auth-token/", {
      method: "POST",
      body: JSON.stringify({
        username: "dbuckley",
        password: "password"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(res)
  }
  
  return (
    <Stack spacing={3} paddingLeft="10%" paddingRight="10%">
      <Heading as="h1" size="xl" mb={4}>
        ADMIN
      </Heading>
      <form onSubmit={onSubmit} onChange={onChange}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Enter Username"  
          name="username"
        />
      
        <InputGroup size="md">      
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Input type="submit" value="Submit" />
      </form>
    </Stack>
  );
}
