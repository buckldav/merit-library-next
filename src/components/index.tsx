import { Input, InputProps, Select, SelectProps } from "@chakra-ui/react";

export function MyInput(props: InputProps) {
    const { children, ...rest } = props;
    return <Input {...rest} borderColor="#A9B7E0" _hover={{}}>{children}</Input>
}

export function MySelect(props: SelectProps) {
    const { children, ...rest } = props;
    return <Select {...rest} borderColor="#A9B7E0" _hover={{}}>{children}</Select>
}