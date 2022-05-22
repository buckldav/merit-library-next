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
import { Book, Author } from "../../../types/library";
import { AuthContext, AuthContextType } from "providers";
import { MyInput, BookImage } from "../../../components/";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ColourOption, colourOptions } from "../data";
import { ActionMeta, OnChangeValue } from "react-select";
import fuzzySearch from "../../../utils/search";

type Name = keyof Book;
type AuthorSelect = {
  value: string;
  label: string;
};

export default function UpdateBook() {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState<AuthorSelect[]>();
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

  const setSelectableAuthors = (authorArr: Author[]) => {
    const newAuthors = authorArr.map((author) => ({
      label: `${author.last_name}, ${author.first_name}`,
      value: author.id + "",
    }));

    if (authors) {
      setAuthors((authors) => [...authors, newAuthors]);
    } else {
      setAuthors(newAuthors);
    }
  };

  const getCurrentAuthor = (id: number) => {
    return authors?.filter((author) => author.value == id)[0];
  };

  const onChange = (e: FormEvent) => {
    const bData = { ...book } as Book;
    const el = e.target as HTMLInputElement;
    bData[el.name as Name] = el.value.toString();
    setBook(bData);
  };

  const onSubmit = async (e: FormEvent) => {
    //console.log(process.env.API_URL);
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
    //console.log(json);
    router.push("/books/" + json.isbn);
  };

  const handleAuthorCreate = async (inputValue: string) => {
    setIsLoading(true);
    // console.group("Option created");
    // console.log("Wait a moment...");
    const [last_name, first_name] = inputValue.split(", ");
    const res = await fetch(process.env.API_URL + `library/authors/`, {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth.user.token}`,
      },
    });
    const newAuthor = await res.json();
    setBook({ ...book, author: newAuthor.id });
    setSelectableAuthors([newAuthor]);
  };

  useEffect(() => {
    async function getBook() {
      let { id } = router.query;
      let book = null;
      if (!id) {
        const path = window.location.pathname.split("/");
        id = path[path.length - 1];
      }
      if (id && (id as string).match(/^(97(8|9))?\d{9}(\d|X)$/)) {
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

    async function getAuthors() {
      const response = await fetch(process.env.API_URL + "library/authors/", {
        headers: {
          Authorization: `Token ${auth.user.token}`,
        },
      });
      let authors = await response.json();
      setSelectableAuthors(authors);
    }

    if (auth.user.token) {
      getAuthors();
      getBook();
    }
  }, [auth]);

  useEffect(() => setIsLoading(false), [authors]);

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
            color="red.800"
          >
            {book &&
              Object.keys(book).map((key) => (
                <Box my={1}>
                  <FormLabel htmlFor={key}>
                    {bookKeyToString(key as Name)}
                  </FormLabel>
                  {key === "author" ? (
                    <CreatableSelect
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      options={authors}
                      onCreateOption={handleAuthorCreate}
                      defaultValue={getCurrentAuthor(book[key as Name])}
                      name="author"
                    />
                  ) : (
                    bookKeyToString(key as Name) && (
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
                    )
                  )}
                </Box>
              ))}

            <div>
              <Input type="submit" value="Submit" bg="red.900" color="white" />
            </div>
          </Box>
          {book && <BookImage book={book} />}
        </Flex>
      </Box>
    </>
  );
}
