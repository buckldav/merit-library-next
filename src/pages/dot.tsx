import {
  Button,
  Box,
  Heading,
  IconButton,
  Input,
  Text,
  Checkbox,
  CheckboxGroup,
  Select,
} from "@chakra-ui/react";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";
import Image from "next/image";

const HomePage = () => {
  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Home
      </Heading>
      <Input mb={5} placeholder="Search" />
      <Select mb={1} placeholder="Select option">
        <option value="all fields">All fields</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="dewey decimal">Dewey decimal</option>
        <option value="barcode">Barcode</option>
      </Select>

      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<SearchIcon />}
      />
    </Box>
  );
};

export default HomePage;
