import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
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

export default function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
