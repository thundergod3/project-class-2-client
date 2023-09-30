import { Stack as CkStack } from "@chakra-ui/react";

import chakraShouldForwardProp from "utils/chakraShouldForwardProp";

export const NavLinkItem = chakraShouldForwardProp(CkStack, ({ isActive }) => ({
  width: "100%",
  padding: "8px 24px",
  paddingRight: 0,
  borderBottom: "solid 1px rgba(0, 0, 0, 0.30)",
  cursor: "pointer",
  color: isActive ? "text.secondary" : "black",
  fontWeight: isActive ? "700" : "400",
}));
