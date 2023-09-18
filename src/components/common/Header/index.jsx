import React from "react";
import { Image, Stack, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as CkLink } from "@chakra-ui/react";

import logoImage from "assets/images/logo.png";

import { HeaderContainer } from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer
      direction="row"
      alignItems="center"
      justifyContent="space-between">
      <Image src={logoImage} h="60px" objectFit="cover" />
      <Stack direction="row" alignItems="center" spacing="18px">
        <Avatar size="md" />
        <Stack alignItems="center" spacing={0}>
          <Text color="text.secondary" fontSize="md">
            Xin chào,{" "}
            <Text color="black" as="span">
              thuhuong612
            </Text>
          </Text>
          <Stack direction="row" alignItems="center" spacing="18px">
            <CkLink as={Link} textDecoration="underline">
              Đổi mật khẩu
            </CkLink>
            <CkLink as={Link} textDecoration="underline">
              Đăng xuất
            </CkLink>
          </Stack>
        </Stack>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
