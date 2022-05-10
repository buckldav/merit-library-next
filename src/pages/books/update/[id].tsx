// @ts-nocheck
import { useContext, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
//import fetch from "node-fetch"
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Modal,
  Heading,
  Alert,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Book } from "../../../types/library";
import { AuthContext, AuthContextType } from "providers";
import { MyInput, BookImage } from "../../../components/";

type Name = keyof Book;

export default function UpdateBook() {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [book, setBook] = useState<Book>();
  const { auth } = useContext(AuthContext) as AuthContextType;

  const bookKeyToString = (key: Name) => {
    if (key === "isbn") {
      return key.toUpperCase();
    } else {
      let text = key.split("_").join(" ");
      if (key === "image") {
        text += " URL";
      }
      return text;
    }
  };

  const getRequired = (key: Name) => {
    return !["image"].includes(key);
  };

  const getDisabled = (key: Name) => {
    return ["isbn", "last_name", "first_name"].includes(key);
  };

  const onChange = (e: FormEvent) => {
    const bData = { ...book } as Book;
    const el = e.target as HTMLInputElement;
    bData[el.name as Name] = el.value.toString();
    setBook(bData);
  };

  const onSubmit = async (e: FormEvent) => {
    console.log(process.env.API_URL);
    e.preventDefault();
    let { id } = router.query;

    const res = await fetch(process.env.API_URL + `library/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
      headers: {
        Authorization: `Token ${auth.user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);
    router.push("/books/" + json.isbn);
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
        console.log("Token", auth.user.token);
        try {
          const response = await fetch(
            process.env.API_URL + "library/books/" + id,
            {
              headers: {
                Authorization: `Token ${auth.user.token}`,
              },
            }
          );
          book = await response.json();
          setBook(book as Book);
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (auth.user.token) {
      getBook();
    }
  }, [auth]);

  return (
    <>
      <Box marginY={4}>
        <Heading textAlign="center">Update Book</Heading>
        {error && <Alert>{error}</Alert>}
        {success && <Alert>{success}</Alert>}
        <Flex justify="center" alignItems="flex-end" gridGap="8">
          <Box
            as="form"
            textAlign="center"
            marginTop={4}
            onChange={onChange}
            onSubmit={onSubmit}
            minWidth={500}
          >
            {book &&
              Object.keys(book).map((key) => (
                <div>
                  <FormLabel htmlFor={key}>
                    {bookKeyToString(key as Name)}
                  </FormLabel>
                  <MyInput
                    pr="4.5rem"
                    type={
                      key === "pages"
                        ? "number"
                        : key === "image"
                        ? "url"
                        : "text"
                    }
                    placeholder={`Enter ${bookKeyToString(key as Name)}`}
                    name={key}
                    id={key}
                    defaultValue={book[key as Name]}
                    isRequired={getRequired(key as Name)}
                    isDisabled={getDisabled(key as Name)}
                  />
                </div>
              ))}

            <div>
              <Input type="submit" value="Submit" bg="red.900" color="white" />
            </div>
          </Box>
          <BookImage book={book} />
        </Flex>
      </Box>
    </>
  );
}
