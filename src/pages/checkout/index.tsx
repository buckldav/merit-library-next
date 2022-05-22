import { ChangeEvent, useEffect, useState, useContext } from "react";
import {
  Button,
  Heading,
  InputGroup,
  Text,
  Link,
  Box,
  Flex,
  IconButton
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "../../providers";

import { MyInput, MySelect } from "../../components"
import { CheckoutRead, Book } from "types/library";
import { SearchIcon } from "@chakra-ui/icons";
import { shuffleCheckoutRead } from "utils/search";
import { PaginatedBooks } from "../../components/pagination"

export default function Checkouts() {
  const [checkouts, setCheckouts] = useState<Array<CheckoutRead>>();
  const [searchResults, setSearchResults] = useState<Array<CheckoutRead>>();
  const { auth } = useContext(AuthContext) as AuthContextType;

  const onCheckIn = async (id: number) => {
    const c = checkouts?.filter((val) => val.id === id)[0];
    const checkout = JSON.stringify({
      ...c,
      book: c?.book.isbn,
      student: c?.student.id,
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
        setCheckouts((checkouts as Array<CheckoutRead>).filter(c => c.book));
        setSearchResults((checkouts as Array<CheckoutRead>).filter(c => c.book));
      }
    }

    getCheckouts();
  }, [auth]);


  const handleSearch = (event: ChangeEvent) => {
    const results:CheckoutRead[] = [];
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    
    //console.log((event.target as HTMLInputElement).value);
    if (search.length >= 1) {
      checkouts?.forEach((checkout) => {
        const book = checkout.book;
        if (book.title.toLowerCase().includes(search)) {
          results.push(checkout);
        } else if (book.first_name.toLowerCase().includes(search) || book.last_name.toLowerCase().includes(search)) {
          results.push(checkout);
        } else if (checkout.student.first_name.toLowerCase().includes(search) || checkout.student.last_name.toLowerCase().includes(search)) {
          results.push(checkout);
        }
      });
  
      setSearchResults(results);
    } else if (checkouts) {
      setSearchResults(checkouts);
    }
  };







  return (
    <Box mb={8}  w="full">
      <Heading as="h1" size="xl" mb={4}>
        Checkouts list
      </Heading>

      <InputGroup size="md" flexDirection="column" margin={"0 auto"} width="500px"  borderColor="#A9B7E0">
        <MyInput mb={5} placeholder="Search" onChange={handleSearch} />
        
      </InputGroup>
      
      <Flex direction="row">
        <Box>
          {searchResults?.map((checkout) => {
            const book = checkout.book;
            console.log(checkout)
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
                  <Text fontSize={20} textDecoration="underline" fontWeight="bold">{book.title}</Text>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>Author: </Text> {book.last_name}, {book.first_name}</Flex>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>Call Number: </Text> {book.call_number}</Flex>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>ISBN: </Text> {checkout.book.isbn}</Flex>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>Student: </Text> {checkout.student.first_name} {checkout.student.last_name}</Flex>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>Checkout_Time: </Text> {new Date(checkout.checkout_time).toLocaleDateString()}
                  </Flex>
                  <Flex direction="row" fontSize={13}><Text fontWeight="bold" marginRight={2}>Due_Date: </Text> {new Date(checkout.due_date).toLocaleDateString()}</Flex>
                  <br/>
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

      {/* <div id="container" >
        <PaginatedBooks booksPerPage={15} allBooks={searchResults?.map(s => s.book) as Book[]} />
      </div> */}
    </Box>
  );
}
