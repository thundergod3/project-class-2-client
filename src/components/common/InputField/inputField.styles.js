import {
  chakra,
  FormLabel as CkFormLabel,
  Box as CkBox,
} from "@chakra-ui/react";

export const FormLabel = chakra(CkFormLabel, {
  baseStyle: () => ({
    fontSize: "14px",
    fontWeight: "bold",
  }),
});

export const InputIconContainer = chakra(CkBox, {
  baseStyle: () => ({
    marginRight: "8px",
  }),
});
