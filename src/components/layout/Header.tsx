import { Flex, Box } from "@chakra-ui/react";

import Link from "next/link";
import Image from "next/image";

const navlinks = [
  {href: "/", text: "Home"},
  {href: "/books", text: "Books"},
  {href: "/admin", text: "Admin"},
]

const Header = () => {
  return (
    <>
      
      
      <Flex as="nav" zIndex="1" position="sticky" top={0} align="center" width="full" padding="5px" pl={5} bg="linear-gradient(.25turn, #870000, 70%, #162e49);"  gap={12}    >
        
        <a href="/"><Image src="/logo.png" width={60} height={50}  /></a>

        {navlinks.map(link => <Link href={link.href}><Box padding={5} pr={5} pl={5}  color="white" _hover={{
    background: "#870000",
    color: "white",
  }} cursor="pointer">
          {link.text}
        </Box>
        </Link>)}
        
        
        
      </Flex>
      
    </>
  );
};

export default Header;
