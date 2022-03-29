import { useEffect, useState, useContext, FormEvent } from "react"
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers"

import Image from "next/image";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books, setBooks] = useState([]);
  const { auth } = useContext(AuthContext) as AuthContextType

  function onSubmit(e: FormEvent) {
    console.log(e)
    onClose()
  }

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/", {
        headers: {
          "Authorization": `Token ${auth.user.token}`
        }
      })
      const books = await response.json()
      console.log(books)
      if (books instanceof Array) {
        setBooks(books)
      }
    }

    getBooks()
  }, [])

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Book list
      </Heading>
      <Stack spacing="8" direction="row">
        <Button colorScheme="red" onClick={onOpen}>Check out</Button>
      </Stack>
      <Flex direction="row">
        {/*<Image src="/dino.png" width={400} height={400} />*/}
        <Box>
          {books.map(book => (

            <Flex direction="row" margin={5}>
              {book.image ? <img src={book.image} height={100} layout='fill' /> : <img src="/Book_Placeholder.png" layout='fill' height={100} />}

              <Box margin={5}>
                <Text fontSize={20} >{book.title}</Text>
                <Text fontSize={15}>{book.last_name}, {book.first_name}</Text>
                <Text fontSize={13}>Call Number: {book.call_number}</Text>
              </Box>


            </Flex>
          ))}

        </Box>
      </Flex>{" "}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Student ID" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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



