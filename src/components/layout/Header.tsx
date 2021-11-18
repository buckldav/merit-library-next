import { Flex, Box } from "@chakra-ui/react";

import Link from "next/link";

const Header = () => {
  return (
    <Flex as="nav" width="full" align="center">
      <Box pr={5} color="blue.600">
        <Link href="/">Home</Link>
      </Box>
      <Box color="blue.600">
        <Link href="/books">Books</Link>
      </Box>
    </Flex>
  );
};

export default Header;
