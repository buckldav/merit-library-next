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
  useDisclosure,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers"

import Image from "next/image";
import { Checkout } from "types/library";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books, setBooks] = useState<Array<Checkout>>();
  const { auth } = useContext(AuthContext) as AuthContextType

  

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
        setBooks(books as Array<Checkout>)
      }
    }

    getBooks()
  }, [auth])

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Book list
      </Heading>
      <Flex direction="row">
        {/*<Image src="/dino.png" width={400} height={400} />*/}
        <Box>
          {books?.map((val) => {
            const book = val as Checkout;
            return (
              <Flex direction="row" margin={5}>
                <Link href={`/books/${book.isbn}`}>{book.image ? <img src={book.image} height={100} /> : <img src="/Book_Placeholder.png" height={100} />}</Link>
                <Box margin={5}>
                  <Text fontSize={20}><Link href={`/books/${book.isbn}`}>{book.title}</Link></Text>
                  <Text fontSize={15}>{book.last_name}, {book.first_name}</Text>
                  <Text fontSize={13}>Call Number: {book.call_number}</Text>
                </Box>
              </Flex>
            )
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



