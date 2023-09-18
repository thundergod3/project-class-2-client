import { chakra, Flex as CkFlex, Table as CkTable } from "@chakra-ui/react";

export const TableLoadingContainer = chakra(CkFlex, {
  baseStyle: () => ({
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "400px",
  }),
});

export const TableContainer = chakra(CkTable, {
  baseStyle: () => ({
    width: "100%",
  }),
});
