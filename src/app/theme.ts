// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Drawer: {
      baseStyle: {
        dialog: {
          width: "400px !important",
          maxWidth: "400px !important",
        },
      },
    },
  },
});

export default theme;
