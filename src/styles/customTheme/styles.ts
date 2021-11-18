import { mode } from "@chakra-ui/theme-tools";
import { DeepPartial, Theme } from "@chakra-ui/react";

const styles: DeepPartial<Theme["styles"]> = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "blue.900")(props),
    },
  }),
};

export default styles;
