import {
  chakra,
  FormControl as CkFormControl,
  FormLabel as CkFormLabel,
} from "@chakra-ui/react";

import chakraShouldForwardProp from "utils/chakraShouldForwardProp";

export const FormControl = chakraShouldForwardProp(
  CkFormControl,
  ({ direction }) => ({
    position: "relative",
    display: "flex",
    flexDirection: direction,
  })
);

export const FormLabel = chakra(CkFormLabel, {
  baseStyle: () => ({
    fontSize: "14px",
    fontWeight: "bold",
    minWidth: "max-content",
  }),
});
