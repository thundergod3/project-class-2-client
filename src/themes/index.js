import { extendTheme } from "@chakra-ui/react";
import {
  BLUE_100_BACKGROUND,
  BLUE_400_BACKGROUND,
  GREY_100_BACKGROUND,
  GREY_400_BACKGROUND,
  GREY_600_BACKGROUND,
  PRIMARY_BACKGROUND,
  PRIMARY_TEXT,
  SECONDARY_BACKGROUND,
  SECONDARY_TEXT,
  SHADOW_BACKGROUND,
} from "./globalStyles";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: GREY_100_BACKGROUND,
        height: "100%",
        width: "100%",
        fontFamily: "'Maven Pro', sans-serif",
      },
    },
  },
  colors: {
    text: {
      primary: PRIMARY_TEXT,
      secondary: SECONDARY_TEXT,
    },
    background: {
      primary: PRIMARY_BACKGROUND,
      secondary: SECONDARY_BACKGROUND,
      grey: {
        100: GREY_100_BACKGROUND,
        400: GREY_400_BACKGROUND,
        600: GREY_600_BACKGROUND,
      },
      blue: {
        100: BLUE_100_BACKGROUND,
        400: BLUE_400_BACKGROUND,
      },
      shadow: SHADOW_BACKGROUND,
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

export default theme;
