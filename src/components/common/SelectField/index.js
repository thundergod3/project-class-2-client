import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Select } from "chakra-react-select";

import { FormControl, FormLabel } from "./selectField.styles";

const SelectField = ({
  name,
  label,
  usingBorder = true,
  usingWhiteBackground = true,
  optionList = [],
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  formControlStyle = {},
  formLabelStyle = {},
  selectFieldStyle = {},
  direction = "column",
  isRequired,
  minWidthLabel,
  isMulti,
  ...rest
}) => {
  const isError = error && touched;

  return (
    <FormControl
      display="flex"
      isInvalid={isError}
      direction={direction}
      {...formControlStyle}>
      {label && (
        <FormLabel minWidth={minWidthLabel} {...formLabelStyle}>
          {label}{" "}
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Box flex={1}>
        <Box
          borderColor={isError ? "red" : "black"}
          borderWidth={isError ? "2px" : "1px"}
          _hover={{
            borderColor: "black",
          }}
          border={usingBorder ? "solid 1px inherit" : "none"}
          borderRadius="6px">
          <Select
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            usingLabel={label}
            usingPlaceholder={placeholder}
            onBlur={onBlur}
            isMulti={isMulti}
            options={optionList}
            {...selectFieldStyle}
            {...rest}
          />
        </Box>
        {error && touched && (
          <Text marginTop="5px" color="red.500" fontSize="14px">
            {error}
          </Text>
        )}
      </Box>
    </FormControl>
  );
};

export default SelectField;
