import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

const HomePage = () => {
  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Hello!
      </Heading>
      <Text mb={4}>Add stuff here for the Home Page!</Text>
      <Image src="/books.jpg" width={600} height={400} alt="some books" />
    </Box>
  );
};

export default HomePage;
