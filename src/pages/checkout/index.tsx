import { useEffect, useState, useContext } from "react";
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
import { CheckoutRead } from "types/library";
import { SearchIcon } from "@chakra-ui/icons";

export default function Books() {
  const [checkouts, setCheckouts] = useState<Array<CheckoutRead>>();
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
        setCheckouts(checkouts as Array<CheckoutRead>);
      }
    }

    getCheckouts();
  }, [auth]);

  return (
    <Box mb={8}  w="full">
      <Heading as="h1" size="xl" mb={4}>
        Checkouts list
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
          {checkouts?.map((checkout) => {
            const book = checkout.book;
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
                  <Text fontSize={15} fontWeight="bold">{book.title}</Text>
                  <Text fontSize={15}>
                    Author: {book.last_name}, {book.first_name}
                  </Text>
                  <Text fontSize={13}>Call Number: {book.call_number}</Text>
                  <Text fontSize={13}>ISBN: {checkout.book.isbn}</Text>
                  <Text fontSize={13}>Student: {checkout.student.first_name} {checkout.student.last_name}</Text>
                  <Text fontSize={13}>
                    Checkout Time: {new Date(checkout.checkout_time).toLocaleDateString()}
                  </Text>
                  <Text fontSize={13}>Due Date: {new Date(checkout.due_date).toLocaleDateString()}</Text>
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
    </Box>
  );
}
