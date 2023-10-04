import { Button, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { GrAdd } from "react-icons/gr";
import { GoSearch } from "react-icons/go";

import useDebounce from "hooks/useDebounce";

import InputField from "../InputField";
import { SearchField } from "./tableFilter.styles";

const TableFilter = ({
  placeholder,
  onSearch,
  createText = "Thêm mới",
  onCreate,
  hideCreateBtn,
}) => {
  const handleSearch = (event) => {
    const { value } = event.target;

    onSearch?.(value);
  };

  const debounceFn = useDebounce(handleSearch, 500);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flex={1}
      w="full">
      <SearchField>
        <InputField
          variant="unstyled"
          onChange={debounceFn}
          placeholder={placeholder}
          width="600px"
          leftInputIcon={<Icon as={GoSearch} boxSize={4} />}
        />
      </SearchField>
      {!hideCreateBtn && (
        <Button
          _hover={{
            background: "background.primary",
          }}
          leftIcon={<Icon as={GrAdd} boxSize={4} />}
          background="background.primary"
          onClick={onCreate}
          h="50px">
          {createText}
        </Button>
      )}
    </Stack>
  );
};

export default TableFilter;
