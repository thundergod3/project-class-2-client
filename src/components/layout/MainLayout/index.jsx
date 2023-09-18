import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";

const MainLayout = ({ title, children }) => {
  return (
    <Box>
      <Header />
      <Stack direction="row" w="full" spacing={0}>
        <Sidebar />
        <Stack spacing={0} w="full">
          <Box background="background.grey.400" w="full" padding="8px 16px">
            <Text fontSize="20px" fontWeight="bold">
              {title}
            </Text>
          </Box>
          <Box h="full" background="background.grey.100">
            {children}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainLayout;
