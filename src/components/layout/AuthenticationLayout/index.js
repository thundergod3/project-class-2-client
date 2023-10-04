import { Center, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

import logoAuthImage from "assets/images/logo_auth.png";

const AuthenticationLayout = ({ title, children }) => {
  return (
    <Center h="100vh">
      <Stack
        spacing={6}
        padding="0px 60px 80px 60px"
        background="white"
        borderRadius="6px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
        <Image src={logoAuthImage} h="300px" objectFit="contain" />
        {title && (
          <Text fontSize="36px" fontWeight="bold" color="text.secondary">
            {title}
          </Text>
        )}
        {children}
      </Stack>
    </Center>
  );
};

export default AuthenticationLayout;
