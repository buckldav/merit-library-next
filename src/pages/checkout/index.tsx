import { useEffect, useState, useContext, FormEvent } from "react";
import {
  FormControl,
  Button,
  ButtonGroup,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Modal,
  Heading,
  Text,
  Link,
  Box,
  useDisclosure,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers";

import Image from "next/image";
import { Checkout } from "types/library";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkouts, setCheckouts] = useState<Array<Checkout>>();
  const { auth } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    async function getCheckouts() {
      const response = await fetch(process.env.API_URL + "library/checkouts/", {
        headers: {
          Authorization: `Token ${auth.user.token}`,
        },
      });
      const checkouts = await response.json();
      console.log(checkouts);
      if (checkouts instanceof Array) {
        setCheckouts(checkouts as Array<Checkout>);
      }
    }

    getCheckouts();
  }, [auth]);

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Checkouts list
      </Heading>
      <Flex direction="row">
        {/*<Image src="/dino.png" width={400} height={400} />*/}
        <Box>
          {checkouts?.map((val) => {
            const checkout = val as Checkout;
            return (
              <Flex direction="row" margin={5}>
                {/* <Link href={`/checkouts/${checkout.isbn}`}>{checkout.image ? <img src={checkout.image} height={100} /> : <img src="/Book_Placeholder.png" height={100} />}</Link>
                <Box margin={5}>
                  <Text fontSize={20}><Link href={`/checkouts/${checkout.isbn}`}>{checkout.title}</Link></Text>
                  <Text fontSize={15}>{checkout.last_name}, {checkout.first_name}</Text>
                  <Text fontSize={13}>Call Number: {checkout.call_number}</Text>
                </Box> */}
              </Flex>
            );
          })}
        </Box>
      </Flex>{" "}
    </Box>
  );
}
