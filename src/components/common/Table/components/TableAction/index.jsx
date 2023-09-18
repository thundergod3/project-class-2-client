import { Icon, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { PiPencilSimple } from "react-icons/pi";

const TableAction = ({ onEdit = () => {}, onRemove = () => {} }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <IconButton
        variant="unstyled"
        fontSize="20px"
        icon={<Icon as={BsTrash3} />}
        onClick={onRemove}
        h="fit-content"
      />
      <IconButton
        variant="unstyled"
        fontSize="20px"
        icon={<Icon as={PiPencilSimple} />}
        onClick={onEdit}
        h="fit-content"
      />
    </Stack>
  );
};

export default TableAction;
