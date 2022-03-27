import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

import Footer from "./Footer";
const Header = dynamic(() => import("./Header"), { ssr: false });

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (<>
    <Box position="fixed" zIndex={-1} top={0} backgroundImage="url('/Landscape.jpg')" backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"></Box>
    <Box margin="0 auto" maxWidth={1000} transition="0.5s ease-out"  bg="white" minHeight="102vh" marginTop="-34px">
      <Box marginY="8">
        <Header />
        <Box as="main" margin={22} minHeight="470px">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  </>);
};

export default Layout;
