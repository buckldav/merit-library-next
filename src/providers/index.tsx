// https://reactjs.org/docs/context.html
// https://www.patterns.dev/posts/provider-pattern/
import React from "react"
export type Auth = {
    user: {
        token: string | null
    }
}

export interface AuthContextType {
    auth: Auth,
    setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

export const AuthContext = React.createContext<AuthContextType | null>(null);