import { Text } from "@chakra-ui/react";
import React from "react";

const FileName = ({ name, link }) => {
  const openLink = () => {
    if (!link) {
      return;
    }

    window.open(link, "_blank");
  };

  return (
    <Text
      textDecoration={link ? "underline" : "none"}
      color={link ? "text.secondary" : "black"}
      cursor={link ? "pointer" : "default"}
      onClick={openLink}>
      {name}
    </Text>
  );
};

export default FileName;
