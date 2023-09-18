import { Thead, Tr, Th, Text } from "@chakra-ui/react";
import React from "react";

const TableHead = ({ columnData }) => (
  <Thead>
    <Tr>
      {columnData.map((column, index) => (
        <Th
          borderColor="background.grey.600"
          background="background.grey.400"
          whiteSpace="nowrap"
          scope="col"
          key={column?.columnId + index}
          textTransform="capitalize"
          px={2}
          fontSize="18px"
          textAlign="center">
          <Text color={column.textColor || "text.third"}>{column?.label}</Text>
        </Th>
      ))}
    </Tr>
  </Thead>
);

export default TableHead;
