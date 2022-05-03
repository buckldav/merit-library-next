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
import { Book } from "types/library";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books, setBooks] = useState<Array<Book>>();

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/");
      const books = await response.json();
      console.log(books);
      if (books instanceof Array) {
        setBooks(books as Array<Book>);
      }
    }

    getBooks();
  }, []);

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Book list
      </Heading>
      <Flex direction="row">
        <Box>
          {books?.map((val) => {
            const book = val as Book;
            return (
              <Flex direction="row" margin={5}>
                <Link href={`/books/${book.isbn}`}>
                  {book.image ? (
                    <img src={book.image} height={100} />
                  ) : (
                    <img src="/Book_Placeholder.png" height={100} />
                  )}
                </Link>
                <Box margin={5}>
                  <Text fontSize={20}>
                    <Link href={`/books/${book.isbn}`}>{book.title}</Link>
                  </Text>
                  <Text fontSize={15}>
                    {book.last_name}, {book.first_name}
                  </Text>
                  <Text fontSize={13}>Call Number: {book.call_number}</Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Flex>{" "}
    </Box>
  );
}

//<Modal isOpen={isOpen} onClose={onClose}>
//   <ModalOverlay />
//   <ModalContent>
//     <ModalHeader>Student info</ModalHeader>
//     <ModalCloseButton />
//     <ModalBody>
//       <Input placeholder="First name" />
//       <Input placeholder="Last name" />
//       <Input placeholder="Email" type="email" />
//       <Input placeholder="Student id" />
//     </ModalBody>

//     <ModalFooter>
//       <Button colorScheme="blue" mr={3} onClick={onClose}>
//         Close
//       </Button>
//       <Button variant="ghost" onClick={onSubmit}>Submit</Button>
//     </ModalFooter>
//   </ModalContent>
// </Modal>

//one check out button, student gives id, if id is not in database, brings up the above modal to create new student, otherwise, the book is checked out
