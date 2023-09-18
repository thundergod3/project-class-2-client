import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { FormControl, FormLabel, Select } from "./selectField.styles";

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
        <Select
          borderColor={isError ? "red" : "black"}
          borderWidth={isError ? "2px" : "1px"}
          _hover={{
            borderColor: "black",
          }}
          name={name}
          value={value}
          onChange={onChange}
          border={usingBorder ? "solid 1px inherit" : "none"}
          placeholder={placeholder}
          cursor="pointer"
          usingLabel={label}
          usingPlaceholder={placeholder}
          onBlur={onBlur}
          {...selectFieldStyle}
          {...rest}>
          {optionList.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
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
