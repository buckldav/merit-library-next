import {
  Box,
  Heading,
  InputGroup,
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


      <InputGroup size="md" flexDirection="column" margin={"0 auto"} width="500px"  borderColor="#A9B7E0">
        <MyInput mb={5} placeholder="Search" />
        <MySelect  mb={1} placeholder="Select option">
          <option value="all fields">All fields</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="student id">Student ID</option>
          <option value="dewey decimal">Dewey decimal</option>
        </MySelect>
        

        <IconButton
          alignSelf="center"
          width="200px"
          colorScheme="gray"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </InputGroup>
    </Box>

  );
};

export default HomePage;
