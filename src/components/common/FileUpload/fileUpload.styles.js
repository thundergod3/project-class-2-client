import {
  chakra,
  Flex as CkFlex,
  FormLabel as CkFormLabel,
} from "@chakra-ui/react";

export const Container = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
  }),
});

export const UploadButton = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    borderRadius: "10px",
    background: "#4B843F",
    cursor: "pointer",
    gap: "8px",
    height: "40px",
  }),
});

export const FileNameContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    paddingLeft: "12px",
  }),
});

export const FormLabel = chakra(CkFormLabel, {
  baseStyle: () => ({
    fontSize: "14px",
    fontWeight: "bold",
  }),
});

export const FileContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    borderRadius: "10px",
    border: "1px solid #000",
    background: "#fff",
    width: "100%",
  }),
});
