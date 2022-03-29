import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
//import fetch from "node-fetch"
import {
  FormControl,
  Button,
  Text,
  Heading,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Book } from "../../types/library"
import { AuthContext, AuthContextType } from 'providers';


export default function BookDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [book, setBook] = useState<Book>()
  const { auth } = useContext(AuthContext) as AuthContextType

  useEffect(() => {
    async function getBook() {
      const { id } = router.query;
      let book = null
      console.log("ID", id)
      if (id && (id as string).match(/^(97(8|9))?\d{9}(\d|X)$/)) {
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

    getBook()
  }, [])

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