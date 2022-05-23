import { useContext } from "react";
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import router from "next/router";
import Link from "next/link";
import { AuthContext, AuthContextType } from "providers";
import Cookies from "js-cookie";

const navlinks = [
  { href: "/", text: "Home" },
  { href: "/books", text: "Books" },
  { href: "/signin", text: "Sign In" },
];

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType;

  return (
    <>
      <Flex
        as="nav"
        zIndex="100"
        position="sticky"
        top={0}
        align="center"
        width="full"
        padding="5px"
        bg="linear-gradient(.25turn, #870000, 70%, #162e49);"
        gridGap={4}
      >
        <a href="/">
          <img src="/logo.png" width={50} height={40} />
        </a>
        {navlinks.map(
          (link) =>
            (link.href !== "/signin" ||
              (link.href === "/signin" && !auth.user.token)) && (
              <Link href={link.href}>
                <Box
                  padding={5}
                  pr={5}
                  pl={5}
                  color="white"
                  _hover={{
                    background: "#870000",
                    color: "white",
                  }}
                  cursor="pointer"
                >
                  {link.text}
                </Box>
              </Link>
            )
        )}
        {auth.user.token && (
          <Menu>
            <MenuButton as={Button} rightIcon={"v"}>
              User
            </MenuButton>
            <MenuList>
              <MenuItem>
                <a href="/books/add/">Add Book</a>
              </MenuItem>
              <MenuItem>
                <a href="/checkout/">Checkout List</a>
              </MenuItem>
              <MenuItem>
                <Button
                  onClick={() => {
                    setAuth({ user: { token: null } });
                    Cookies.set("auth", "", { expires: 0 });
                    router.push("/");
                  }}
                >
                  Sign Out
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </>
  );
};

export default Header;
