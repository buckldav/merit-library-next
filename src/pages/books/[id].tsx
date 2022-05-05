import { useContext, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
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
  Alert,
} from "@chakra-ui/react";
import { Book } from "../../types/library";
import { AuthContext, AuthContextType } from "providers";
import { BookImage } from "../../components";

type Student = {
  id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
};

export default function BookDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [book, setBook] = useState<Book>();
  const [student, setStudent] = useState<Student>();
  const [newStudent, setNewStudent] = useState<boolean>(false);
  const { auth } = useContext(AuthContext) as AuthContextType;

  async function postStudent() {
    const res = await fetch(process.env.API_URL + "library/students/", {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        Authorization: `Token ${auth.user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log("Student", res, json);
  }

  async function checkoutBook() {
    const bookData = {
      book: book?.isbn,
      student: student?.id,
    };

    const res = await fetch(process.env.API_URL + "library/checkouts/", {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        Authorization: `Token ${auth.user.token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    const json = await res.json();
    // console.log(json);
    router.push("/checkout/" + json.id);
  }

  const onSubmit = async (e: FormEvent) => {
    console.log(process.env.API_URL);
    e.preventDefault();
    if (!student?.email) {
      // get a student
      const res = await fetch(
        process.env.API_URL + "library/students/" + student?.id,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${auth.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log(json);
      if (json.detail === "Not found.") {
        setNewStudent(true);
      } else {
        // student found, post book
        await checkoutBook();
        onClose();
      }
    } else {
      // create student first
      await postStudent();
      // post a book
      await checkoutBook();
      onClose();
    }
  };

  useEffect(() => {
    async function getBook() {
      let { id } = router.query;
      let book = null;
      if (!id) {
        const path = window.location.pathname.split("/");
        id = path[path.length - 1];
      }
      console.log("ID", id);
      if (id && (id as string).match(/^(97(8|9))?\d{9}(\d|X)$/)) {
        try {
          const response = await fetch(
            process.env.API_URL + "library/books/" + id
          );
          book = await response.json();
          setBook(book as Book);
        } catch (e) {
          console.error(e);
        }
      }
    }

    getBook();
  }, []);

  return (
    <Box>
      <table>
        <tr>
          <td>
            {book && <BookImage book={book} />}
            <Button as="a" href={`/books/update/${book?.isbn}`}>
              Edit Book
            </Button>
          </td>
          <td>
            <Heading as="h1" size="xl">
              {book?.title}
            </Heading>
            <Heading as="h4" size="md">
              {book?.last_name} {book?.first_name}
            </Heading>
            <Text>call number: {book?.call_number}</Text> <br />
            <br />
            <br />
            {auth.user.token ? (
              <Button colorScheme="red" onClick={onOpen}>
                Check out
              </Button>
            ) : (
              <Alert level="info">
                A teacher must help you check out the book.
              </Alert>
            )}
          </td>
        </tr>
      </table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor="id">Student ID</label>
            <Input
              type="number"
              name="id"
              placeholder="Student ID"
              onChange={(e) => {
                setStudent({ ...student, id: parseInt(e.target.value) });
              }}
            />
            {newStudent ? (
              <>
                <label htmlFor="first_name">First Name</label>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      id: student?.id || 0,
                      first_name: e.target.value,
                    });
                  }}
                />
                <label htmlFor="last_name">Last Name</label>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      id: student?.id || 0,
                      last_name: e.target.value,
                    });
                  }}
                />
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      id: student?.id || 0,
                      email: e.target.value,
                    });
                  }}
                />
              </>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setNewStudent(false);
                onClose();
              }}
            >
              Close
            </Button>
            <Button variant="ghost" onClick={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
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
