import React from "react";
import { Image, Stack, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as CkLink } from "@chakra-ui/react";

import logoImage from "assets/images/logo.png";
import useAuthenticated from "hooks/useAuthenticated";
import useModal from "hooks/useModal";

import { HeaderContainer } from "./header.styles";
import ConfirmationModal from "../ConfirmationModal";

const Header = () => {
  const { userData, logout } = useAuthenticated();
  const { open: openLogout, Dialog: DialogLogout } = useModal({
    modalBody: ConfirmationModal,
    handleSave: logout,
  });

  return (
    <>
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
                {userData?.name}
              </Text>
            </Text>
            <Stack direction="row" alignItems="center" spacing="18px">
              <CkLink as={Link} textDecoration="underline" to="/">
                Đổi mật khẩu
              </CkLink>
              <CkLink
                textDecoration="underline"
                onClick={() =>
                  openLogout({
                    title: "Xác nhận đăng xuất",
                  })
                }>
                Đăng xuất
              </CkLink>
            </Stack>
          </Stack>
        </Stack>
      </HeaderContainer>
      <DialogLogout description="Bạn có chắc chắn muốn đăng xuất không?" />
    </>
  );
};

export default Header;
