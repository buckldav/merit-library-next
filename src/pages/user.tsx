import {
    Button,
} from "@chakra-ui/react";
import router from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../providers";

export default function User() {
    const { auth, setAuth } = useContext(AuthContext) as AuthContextType;
    useEffect(() => {
        auth.user.token || router.push("/signin")
    }, [])
    return <Button onClick={() => { setAuth({ user: { token: null } }); router.push("/") }}>Sign Out</Button>
}