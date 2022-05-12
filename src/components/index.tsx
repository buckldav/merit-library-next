import { Input, InputProps, Select, SelectProps } from "@chakra-ui/react";
import { Book } from "types/library";

export function MyInput(props: InputProps) {
    const { children, ...rest } = props;
    return <Input {...rest} borderColor="#A9B7E0" _hover={{}}>{children}</Input>
}

export function MySelect(props: SelectProps) {
    const { children, ...rest } = props;
    return <Select {...rest} borderColor="#A9B7E0" _hover={{}}>{children}</Select>
}

export function BookImage(props: { book: Book }) {
    return props.book && props.book.image ? (
        <img src={props.book.image} style={{width: "200px"}} />
      ) : (
        <img src="/Book_Placeholder.png" style={{width: "200px"}} />
      )
}