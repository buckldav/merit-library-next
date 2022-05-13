import React, { useEffect, useState, PropsWithChildren } from 'react';
import ReactPaginate from 'react-paginate';
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
import { Book } from "types/library";
import { BookImage, MyInput, MySelect } from "../components"
import styles from "../styles/pagination.module.css";

// Example books, to simulate fetching from another resources.
type BooksProps = {
  books: Book[]
}

export function Books(props: PropsWithChildren<BooksProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="row">
        <Box>
          {props.books?.map((val) => {
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
    </>
  );
}

type PaginatedBooksProps = {
  booksPerPage: number;
}

export function PaginatedBooks(props: PropsWithChildren<PaginatedBooksProps>) {
  // We start with an empty list of books.
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [books, setBooks] = useState<Array<Book>>();
  const [allBooks, setAllBooks] = useState<Array<Book>>();
  useEffect(() => {
    // Get all books on page load
    async function getBooks() {
      const response = await fetch(process.env.API_URL + "library/books/");
      const books = await response.json();
      console.log(books);
      if (books instanceof Array) {
        setAllBooks(books as Array<Book>);
      }
    }

    getBooks();
  }, []);

  useEffect(() => {
    // Get group of books
    if (allBooks) {
      const endOffset = itemOffset + props.booksPerPage;
      // console.log(`Loading books from ${itemOffset} to ${endOffset}`);
      setBooks(allBooks.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(allBooks.length / props.booksPerPage));
    }
  }, [itemOffset, props.booksPerPage, allBooks]);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number; }) => {
    if (allBooks) {
      // console.log(selectedItem.selected, props.booksPerPage, allBooks.length)
      const newOffset = (selectedItem.selected * props.booksPerPage) % allBooks.length;
      // offset is index in array
      // console.log(
      //   `User requested page number ${selectedItem.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
      />
      <div id="books">
        {books && <Books books={books} />}

      </div>
    </>
  );
}