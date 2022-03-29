/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/mononoki";
import "@fontsource/lexend";
import "@fontsource/quicksand";
import "@fontsource/cinzel";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "components/layout";
import createEmotionCache from "styles/createEmotionCache";
import customTheme from "styles/customTheme";
import "styles/globals.css";
import { Auth, AuthContext } from "../providers";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const [auth, setAuth] = useState<Auth>({
    user: {
      token: null
    }
  })

  useEffect(() => {
    if (auth.user.token) {
      localStorage.setItem("auth", JSON.stringify(auth))
    } else {
      const storedAuth = JSON.parse(localStorage.getItem("auth") as string)
      if (storedAuth?.user?.token) {
        setAuth(storedAuth)
      }
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
