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
  InputGroup,
  Text,
  Link,
  Box,
  useDisclosure,
  Flex,
  Stack,
  VStack,
  IconButton
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers";

import { MyInput, MySelect } from "../../components"
import Image from "next/image";
import { Checkout } from "types/library";
import { Book } from "types/library";
import BookDetail from "pages/books/[id]";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkouts, setCheckouts] = useState<Array<Checkout>>();
  const [books, setBooks] = useState<Array<Book>>();
  const { auth } = useContext(AuthContext) as AuthContextType

  const onCheckIn = async (id: number) => {
    const response = await fetch(process.env.API_URL + "library/checkouts/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Token ${auth.user.token}`,
      },
      body: JSON.stringify({
        ...checkouts?.filter(val => val.id === id)[0],
        checkin_time: new Date()
      })
    });
    const json = await response.json();
    console.log(json);
  }

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

    getCheckouts()

    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/", {
        headers: {
          "Authorization": `Token ${auth.user.token}`
        }
      })
      const books = await response.json()
      console.log(books)
      if (books instanceof Array) {
        setBooks(books as Array<Book>)
      }
    }

    getBooks()
  }, [auth])

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Checkouts list
      </Heading>

      
      <InputGroup size="md" borderColor="#A9B7E0">
      <MyInput mb={5} placeholder="Search" />
      <MySelect  mb={1} placeholder="Select option">
        <option value="all fields">All fields</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="student id">Student ID</option>
        <option value="dewey decimal">Dewey decimal</option>
      </MySelect>

      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<SearchIcon />}
      /></InputGroup>

      
      


      
      <Flex direction="row">

      
        {/*<Image src="/dino.png" width={400} height={400} />*/}
        <Box>
        
        
          {checkouts?.map((val) => {
            const checkout = val as Checkout;
            // const book = val as Book;
            const book = {
              image: null
            }
            return (
              <Flex direction="row" margin={5}>
                <Link href={`/books/${checkout.id}`}>{book.image ? <img src={book.image} height={100} /> : <img src="/Book_Placeholder.png" height={100} />}</Link>
                <Box margin={5}>
                  <Text fontSize={13}>ID: {checkout.id}</Text>
                  {/* <Text fontSize={13}>Title: {book.title}</Text> */}
                  <Text fontSize={13}>ISBN: {checkout.book}</Text>
                  <Text fontSize={13}>Student: {checkout.student}</Text>
                  <Text fontSize={13}>Checkout Time: {checkout.checkout_time}</Text>
                  <Text fontSize={13}>Due Date: {checkout.due_date}</Text>
                  <Button colorScheme="red" onClick={() => onCheckIn(checkout.id)}>Check in</Button>
                  
                </Box>
              </Flex>
            );
          })}
        

        </Box>
      </Flex>{" "}
    </Box>
  );
}
