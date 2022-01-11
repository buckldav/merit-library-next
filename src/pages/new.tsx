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

import Image from "next/image";

export default function Projects() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mb={8} w="full">
      <Heading as="h1" size="xl" mb={4}>
        Book list
      </Heading>
      <Stack spacing="8" direction="row">
        <Button onClick={onOpen}>First time check out</Button>
        <Button colorScheme="red">check out</Button>
      </Stack>
      <Flex direction="row">
        <Image src="/dino.png" width={400} height={400} />
        <Box>
          {" "}
          <Text fontSize={40}>Title</Text>
          <Text fontSize={30}>the dino book!</Text>
          <Text fontSize={40}>Author</Text>
          <Text fontSize={30}>Book description</Text>
          <Text>This book is about dinos</Text>
        </Box>
      </Flex>{" "}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Student id" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
