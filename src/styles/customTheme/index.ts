import colors from "./colors";
import fonts from "./fonts";
import { DeepPartial, Theme } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Cinzel, serif",
    mono: "Mononoki, monospace",
  },
  colors,
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default customTheme;
