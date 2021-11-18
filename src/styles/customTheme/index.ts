import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";
import styles from "./styles";

const customTheme = extendTheme({
  fonts,
  colors,
  styles,
});

export default customTheme;
