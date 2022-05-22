import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" display="flex" justify="center" bg="white" pb={4}>
      <Text>
        &copy; {new Date().getFullYear()} -{" "}
        <Link href="https://meritacademy.tech" isExternal>
          meritacademy.tech
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
