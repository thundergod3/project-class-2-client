import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

import { navLinks } from "./constants";

import { NavLinkItem } from "./sidebar.styles";

const Sidebar = () => {
  const history = useHistory();

  const handleNavigateLink = (route) => {
    history.push(route);
  };

  return (
    <Stack
      w="280px"
      minHeight="calc(100vh - 116px)"
      spacing={0}
      borderRight="solid 1px rgba(0, 0, 0, 0.30)"
      background="background.grey.100">
      {navLinks?.map((nav) => (
        <Stack key={nav?.title} spacing={0}>
          <Text
            fontSize="20px"
            color="black"
            w="full"
            background="background.primary"
            padding="8px 16px"
            paddingRight={0}>
            {nav?.title}
          </Text>
          {nav?.items?.map((record) => (
            <NavLinkItem
              key={record?.title}
              onClick={() => handleNavigateLink(record?.route)}>
              <Text>{record?.title}</Text>
            </NavLinkItem>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default Sidebar;
