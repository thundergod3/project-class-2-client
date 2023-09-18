import { chakra, Box as CkBox } from "@chakra-ui/react";

export const SearchField = chakra(CkBox, {
  baseStyle: () => ({
    background: "white",
    borderRadius: "8px",
    border: "1px solid #D0D5DD",
    padding: "12px",
  }),
});
