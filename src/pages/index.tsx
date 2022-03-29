import {
  Box,
  Heading,
  IconButton
} from "@chakra-ui/react";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { MyInput, MySelect } from "../components"

const HomePage = () => {
  return (

    <Box mb={8} w="full" bg="white">
      <Heading as="h1" size="xl" mb={4}>
        HOME
      </Heading>
      <MyInput mb={5} placeholder="Search" />
      <MySelect mb={1} placeholder="Select option">
        <option value="all fields">All fields</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="dewey decimal">Dewey decimal</option>
        <option value="barcode">Barcode</option>
      </MySelect>

      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<SearchIcon />}
      />
    </Box>

  );
};

export default HomePage;
