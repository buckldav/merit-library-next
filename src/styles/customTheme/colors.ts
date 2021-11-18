import { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  blue: {
    100: "#E1EFFF",
    200: "#C5D3FD",
    300: "#A9B7E0",
    400: "#8E9CC4",
    500: "#7482A9",
    600: "#5A698E",
    700: "#425174",
    800: "#293A5C",
    900: "#102544",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export default colors;
