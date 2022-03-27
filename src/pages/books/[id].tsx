import { useRouter } from 'next/router'
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


export default function BookDetail(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const router = useRouter()
  const { id } = router.query



  return(
    
    <Box>
      <table><tr>
      <td><img src="https://mpd-biblio-covers.imgix.net/9781250757302.jpg" width="300px" ></img></td>
      <td><Heading as="h1" size="xl">Rhythm of War</Heading> <Heading as="h4" size="md">Brandon Sanderson</Heading> call number: 1 <br/><br/><br/>
              <Button colorScheme="red" onClick={onOpen}>Check out</Button>
            </td>
            
      </tr>
      </table>
    </Box>
  
    )
}