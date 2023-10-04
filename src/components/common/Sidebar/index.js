import { Stack, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { navLinksAdmin, navLinksStudent, navLinksTeacher } from "./constants";
import history from "utils/history";
import useAuthenticated from "hooks/useAuthenticated";

import { NavLinkItem } from "./sidebar.styles";

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, isTeacher, isStudent } = useAuthenticated();

  const handleNavigateLink = (route) => {
    history.push(route);
  };

  const navLinksBaseOnRole = useMemo(() => {
    if (isAdmin) {
      return navLinksAdmin;
    }

    if (isTeacher) {
      return navLinksTeacher;
    }

    if (isStudent) {
      return navLinksStudent;
    }
  }, [isAdmin, isStudent, isTeacher]);

  return (
    <Stack
      w="fit-content"
      minW="280px"
      minHeight="calc(100vh - 116px)"
      spacing={0}
      borderRight="solid 1px rgba(0, 0, 0, 0.30)"
      background="background.grey.100">
      {navLinksBaseOnRole?.map((nav) => (
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
              onClick={() => handleNavigateLink(record?.route)}
              isActive={location?.pathname === record?.route}>
              <Text>{record?.title}</Text>
            </NavLinkItem>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default Sidebar;
