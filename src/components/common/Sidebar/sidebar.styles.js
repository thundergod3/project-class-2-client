import { chakra, Stack as CkStack } from "@chakra-ui/react";

export const NavLinkItem = chakra(CkStack, {
  baseStyle: () => ({
    width: "100%",
    padding: "8px 24px",
    borderBottom: "solid 1px rgba(0, 0, 0, 0.30)",
    cursor: "pointer",
    paddingRight: 0,
  }),
});
