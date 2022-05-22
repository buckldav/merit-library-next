import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <Box marginY={4}>
        <Heading textAlign="center">404 Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href="/" passHref>
            <Button colorScheme="red">Let&apos;s Head Back</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
