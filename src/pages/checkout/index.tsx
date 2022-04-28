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
import { Book } from "types/library";
import BookDetail from "pages/books/[id]";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkouts, setCheckouts] = useState<Array<Checkout>>();
  const [books, setBooks] = useState<Array<Book>>();
  const { auth } = useContext(AuthContext) as AuthContextType;

  const onCheckIn = async (id: number) => {
    const checkout = JSON.stringify({
      ...checkouts?.filter((val) => val.id === id)[0],
      checkin_time: new Date(),
    });
    console.log(checkout);
    const response = await fetch(
      process.env.API_URL + "library/checkouts/" + id,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${auth.user.token}`,
          "Content-Type": "application/json",
        },
        body: checkout,
      }
    );
    const json = await response.json();
    console.log(json);
    alert("Book Checked In!");
    window.location.reload();
  };

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

    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/", {
        headers: {
          Authorization: `Token ${auth.user.token}`,
        },
      });
      const books = await response.json();
      console.log(books);
      if (books instanceof Array) {
        setBooks(books as Array<Book>);
      }
    }

    getBooks();
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
            // const book = val as Book;
            const book = {
              image: null,
            };
            return (
              <Flex direction="row" margin={5}>
                <Link href={`/books/${checkout.id}`}>
                  {book.image ? (
                    <img src={book.image} height={100} />
                  ) : (
                    <img src="/Book_Placeholder.png" height={100} />
                  )}
                </Link>
                <Box margin={5}>
                  <Text fontSize={13}>ID: {checkout.id}</Text>
                  {/* <Text fontSize={13}>Title: {book.title}</Text> */}
                  <Text fontSize={13}>ISBN: {checkout.book}</Text>
                  <Text fontSize={13}>Student: {checkout.student}</Text>
                  <Text fontSize={13}>
                    Checkout Time: {checkout.checkout_time}
                  </Text>
                  <Text fontSize={13}>Due Date: {checkout.due_date}</Text>
                  <Button
                    colorScheme="red"
                    onClick={() => onCheckIn(checkout.id)}
                  >
                    Check in
                  </Button>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Flex>{" "}
    </Box>
  );
}
