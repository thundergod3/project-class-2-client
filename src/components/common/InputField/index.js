import {
  Input,
  FormControl,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";

import { disabledStyle } from "./constants";

import { FormLabel, InputIconContainer } from "./inputField.styles";

const InputField = ({
  type = "text",
  placeholder = "",
  label = "",
  onSubmit,
  usingEnterInput,
  formControlStyle = {},
  formLabelStyle = {},
  leftInputIcon,
  leftText,
  rightInputIcon,
  showingFocusBorder = true,
  usingTextArea,
  usingSelectNumber,
  isDisabled,
  error,
  touched,
  name,
  onBlur,
  onChange,
  getCardNumberInputProps,
  isRequired,
  minWidthLabel,
  hide,
  ...rest
}) => {
  const isError = error && touched;

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  };

  return hide ? (
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      onKeyDown={usingEnterInput ? (e) => handleOnKeyDown(e) : () => {}}
      focusBorderColor={!showingFocusBorder && "transparent"}
      _disabled={isDisabled && disabledStyle}
      disabled={isDisabled}
      onBlur={onBlur}
      onChange={onChange}
      {...getCardNumberInputProps?.({
        onBlur,
        onChange,
      })}
      borderColor="black"
      _hover={{
        borderColor: "black",
      }}
      hidden={hide}
      {...rest}
    />
  ) : (
    <FormControl display="flex" isInvalid={isError} {...formControlStyle}>
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
      <Stack direction="row" flex={1} gap={0} alignItems="center">
        {leftInputIcon && (
          <InputIconContainer>{leftInputIcon}</InputIconContainer>
        )}
        {usingTextArea ? (
          <Stack width="full" spacing="5px">
            <Textarea
              name={name}
              type={type}
              placeholder={placeholder}
              onKeyDown={usingEnterInput ? (e) => handleOnKeyDown(e) : () => {}}
              focusBorderColor={!showingFocusBorder && "transparent"}
              _disabled={isDisabled && disabledStyle}
              disabled={isDisabled}
              onBlur={onBlur}
              onChange={onChange}
              borderColor="black"
              _hover={{
                borderColor: "black",
              }}
              {...rest}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </Stack>
        ) : (
          <InputGroup flexDirection="column">
            {leftText && (
              <InputLeftElement
                top="-1px"
                pointerEvents="none"
                children={
                  <Text
                    fontWeight={!isDisabled ? "bold" : "normal"}
                    color={isDisabled && "text.grey.100"}>
                    {leftText}
                  </Text>
                }
              />
            )}
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              onKeyDown={usingEnterInput ? (e) => handleOnKeyDown(e) : () => {}}
              focusBorderColor={!showingFocusBorder && "transparent"}
              _disabled={isDisabled && disabledStyle}
              disabled={isDisabled}
              onBlur={onBlur}
              onChange={onChange}
              {...getCardNumberInputProps?.({
                onBlur,
                onChange,
              })}
              borderColor="black"
              _hover={{
                borderColor: "black",
              }}
              {...rest}
            />
            {rightInputIcon && (
              <InputRightElement
                pointerEvents="none"
                children={rightInputIcon}
              />
            )}
            <FormErrorMessage>{error}</FormErrorMessage>
          </InputGroup>
        )}
      </Stack>
    </FormControl>
  );
};

export default InputField;
