import { chakra, Stack as CkStack } from "@chakra-ui/react";

export const HeaderContainer = chakra(CkStack, {
  baseStyle: () => ({
    width: "100%",
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
    background: "white",
    padding: "4px 30px",
  }),
});
