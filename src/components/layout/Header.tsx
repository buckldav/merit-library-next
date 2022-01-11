import { Flex, Box } from "@chakra-ui/react";

import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <>
      <Image src="/logo.png" width={60} height={50} />
      <Flex as="nav" width="full" align="center">
        <Box pr={5} color="blue.600">
          <Link href="/">Home</Link>
        </Box>
        <Box pr={900} color="blue.600">
          <Link href="/books">Books</Link>
        </Box>
        <Box color="blue.600">
          <Link href="/admin">Admin</Link>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
