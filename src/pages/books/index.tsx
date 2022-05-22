import { ChangeEvent, useEffect, useState, useContext, FormEvent } from "react";
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
import { PaginatedBooks } from "../../components/pagination";
import { shuffleBooks } from "utils/search";

import Image from "next/image";
import { Book } from "types/library";
import { BookImage, MyInput, MySelect } from "../../components";
import { EmailIcon, ArrowDownIcon, SearchIcon } from "@chakra-ui/icons";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books, setBooks] = useState<Array<Book>>();
  const [searchResults, setSearchResults] = useState<Book[]>();

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/");
      const books = await response.json();
      if (books instanceof Array) {
        setBooks(books as Array<Book>);
        setSearchResults(books as Array<Book>);
      }
    }

    getBooks();
  }, []);

  const handleSearch = (event: ChangeEvent) => {
    const results: Book[] = [];
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    //console.log((event.target as HTMLInputElement).value);
    if (search.length >= 1) {
      books?.forEach((book) => {
        if (book.title.toLowerCase().includes(search)) {
          results.push(book);
        } else if (
          book.first_name.toLowerCase().includes(search) ||
          book.last_name.toLowerCase().includes(search)
        ) {
          results.push(book);
        }
      });

      setSearchResults(shuffleBooks(results));
    } else if (books) {
      setSearchResults(shuffleBooks(books));
    }
  };

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Books
      </Heading>

      <InputGroup
        size="md"
        flexDirection="column"
        margin={"0 auto"}
        width="500px"
        borderColor="#A9B7E0"
      >
        <MyInput mb={5} placeholder="Search" onChange={handleSearch} />
        {/* <MySelect  mb={1} placeholder="Select option">
          <option value="all fields">All fields</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="call #">Call #</option>
        </MySelect> */}

        {/* <IconButton
          alignSelf="center"
          width="200px"
          colorScheme="gray"
          aria-label="Search database"
          icon={<SearchIcon />}
        /> */}
      </InputGroup>

      <div id="container">
        <PaginatedBooks booksPerPage={15} allBooks={searchResults} />
      </div>
    </Box>
  );
}
