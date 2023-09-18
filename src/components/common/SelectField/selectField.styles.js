import {
  chakra,
  FormControl as CkFormControl,
  FormLabel as CkFormLabel,
  Select as CkSelect,
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

export const Select = chakraShouldForwardProp(
  CkSelect,
  ({ usingPlaceholder }) => ({
    height: usingPlaceholder && "max-content",
    padding: "8px 16px",
    fontSize: "14px",
  })
);
