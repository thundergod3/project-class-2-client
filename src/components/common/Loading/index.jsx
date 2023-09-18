import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = ({ size = "xl", ...rest }) => (
  <Center w="full">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="background.primary"
      size={size}
      {...rest}
    />
  </Center>
);

export default Loading;
