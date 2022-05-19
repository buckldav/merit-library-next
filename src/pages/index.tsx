import {
  Box,
  Heading,
  InputGroup,
  IconButton,
  flexbox,
} from "@chakra-ui/react";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { MyInput, MySelect, } from "../components"






const HomePage = () => {
  return (

    <Box mb={8} w="full" bg="white">
      <Heading as="h1" size="xl" mb={4}>
        Merit Academy <br/> Library
      </Heading>


      
       <img style={{width: "50%", margin: "16px auto", display: "block"}} src="MeritLibrary.jpg"></img> 
    </Box>

  );
};

export default HomePage;
