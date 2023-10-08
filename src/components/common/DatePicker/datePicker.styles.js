import {
  FormLabel as CkFormLabel,
  Flex as CkFlex,
  Box as CkBox,
  chakra,
} from "@chakra-ui/react";

export const FormLabel = chakra(CkFormLabel, {
  baseStyle: () => ({
    fontSize: "14px",
    fontWeight: "bold",
  }),
});

export const DatePickerContainer = chakra(CkFlex, {
  baseStyle: () => ({
    position: "relative",
    borderRadius: "8px",
    alignItems: "center",
    width: "100%",
  }),
});

export const DatePickerCalendarIconContainer = chakra(CkBox, {
  baseStyle: () => ({
    position: "absolute",
    right: "10px",
    top: "8px",
  }),
});
