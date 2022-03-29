import { useContext } from "react"
import { Flex, Box } from "@chakra-ui/react";

import Link from "next/link";
import Image from "next/image";
import { AuthContext, AuthContextType } from "providers";

const navlinks = [
  { href: "/", text: "Home" },
  { href: "/books", text: "Books" },
  { href: "/signin", text: "Sign In" },
  { href: "/user", text: "User" }
]

const Header = () => {
  const { auth } = useContext(AuthContext) as AuthContextType

  return (
    <>
      <Flex as="nav" zIndex="100" position="sticky" top={0} align="center" width="full" padding="5px" bg="linear-gradient(.25turn, #870000, 70%, #162e49);" gridGap={4}>
        <a href="/"><Image src="/logo.png" width={60} height={50} /></a>
        {navlinks.map(link => (
          (link.href !== "/signin" && link.href !== "/user") ||
          (link.href === "/signin" && !auth.user.token) ||
          (link.href === "/user" && auth.user.token)
        ) &&
          <Link href={link.href}>
            <Box padding={5} pr={5} pl={5} color="white" _hover={{
              background: "#870000",
              color: "white",
            }} cursor="pointer">
              {link.text}
            </Box>
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Header;
