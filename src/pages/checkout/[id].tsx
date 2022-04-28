import { useContext, useEffect, useState, FormEvent } from 'react'
import router, { useRouter } from 'next/router'
//import fetch from "node-fetch"
import {
  Box,
  Heading,
  IconButton
} from "@chakra-ui/react";

import { Checkout } from "../../types/library"
import { AuthContext, AuthContextType } from 'providers';








export default function CheckoutDetail() {

    const router = useRouter();
    const { auth } = useContext(AuthContext) as AuthContextType
    const [checkout, setCheckout] = useState<Checkout>()

useEffect(() => {
    async function getCheckout() {
      let { id } = router.query;
      let checkout = null
      if (!id) {
        const path = window.location.pathname.split("/")
        id = path[path.length - 1]
      }
      console.log("ID", id)
      if (id) {
        console.log("Token", auth.user.token)
        try {
          const response = await fetch(process.env.API_URL + "library/checkouts/" + id, {
            headers: {
              "Authorization": `Token ${auth.user.token}`
            }
          })
          checkout = await response.json()
          setCheckout(checkout as Checkout)
          console.log(checkout)
        } catch (e) {
          console.error(e)
        }
      }
    }

    if (auth.user.token) {
    getCheckout()
    }
  }, [auth])

return (checkout ? <>
    <Heading as="h1" size="xl" mb={4}>
        Checked Out
      </Heading>
    <br/>
    <h1>Book: {checkout.book}</h1>
    <h1>ID: {checkout.id}</h1>
</> : null
)
}
