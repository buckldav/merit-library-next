import { useEffect, useState, useContext, FormEvent } from "react";
import {
  FormControl,
  Button,
  ButtonGroup,
  InputGroup,
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
  IconButton,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers";

import Image from "next/image";
import { Book } from "types/library";
import { BookImage, MyInput, MySelect } from "../../components"
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";

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


      <InputGroup size="md" flexDirection="column" margin={"0 auto"} width="500px"  borderColor="#A9B7E0">
        <MyInput mb={5} placeholder="Search" />
        <MySelect  mb={1} placeholder="Select option">
          <option value="all fields">All fields</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="student id">Student ID</option>
          <option value="dewey decimal">Dewey decimal</option>
        </MySelect>
        

        <IconButton
          alignSelf="center"
          width="200px"
          colorScheme="gray"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </InputGroup>






      <Flex direction="row">
        <Box>
          {books?.map((val) => {
            const book = val as Book;
            return (
              <Flex direction="row" margin={5}>
                <Link href={`/books/${book.isbn}`}>
                  <BookImage book={book} />
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
