import { useContext, useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
//import fetch from "node-fetch"
import {
  FormControl,
  Button,
  Input,
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
import { Book } from "../../types/library"
import { AuthContext, AuthContextType } from 'providers';


export default function BookDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [book, setBook] = useState<Book>()
  const { auth } = useContext(AuthContext) as AuthContextType

  function onSubmit(e: FormEvent) {
    console.log(e)
    onClose()
  }

  useEffect(() => {
    async function getBook() {
      let { id } = router.query;
      let book = null
      if (!id) {
        const path = window.location.pathname.split("/")
        id = path[path.length - 1]
      }
      console.log("ID", id)
      if (id && (id as string).match(/^(97(8|9))?\d{9}(\d|X)$/)) {
        console.log("Token", auth.user.token)
        try {
          const response = await fetch(process.env.API_URL + "library/books/" + id, {
            headers: {
              "Authorization": `Token ${auth.user.token}`
            }
          })
          book = await response.json()
          setBook(book as Book)
        } catch (e) {
          console.error(e)
        }
      }
    }

    if (auth.user.token) {
    getBook()
    }
  }, [auth])

  return (

    <Box>
      <table><tr>
        <td>{book?.image ? <img src={book?.image} height={100} /> : <img src="/Book_Placeholder.png" height={100} />}</td>
        <td>
          <Heading as="h1" size="xl">{book?.title}</Heading>
          <Heading as="h4" size="md">{book?.last_name} {book?.first_name}</Heading>
          <Text>call number: {book?.call_number}</Text> <br /><br /><br />
          <Button colorScheme="red" onClick={onOpen}>Check out</Button>
        </td>

      </tr>
      </table>
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

  )
}

// export const getServerSideProps = async (context) => {
//   // const router = useRouter()
//   console.log(context)
//   const { id } = context.params
//   let book = null
//   if ((id as string).match(/^(97(8|9))?\d{9}(\d|X)$/)) {
//     try {
//       const response = await fetch(process.env.API_URL + "library/books/" + id)
//       book = response.json()
//     } catch (e) {
//       //console.error(e)
//     }
//   }

//   return {
//     props: {
//       book
//     }, // will be passed to the page component as props
//   }
// }