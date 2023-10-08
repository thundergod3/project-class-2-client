import { FormErrorMessage, FormControl, Text, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";

import {
  DatePickerCalendarIconContainer,
  DatePickerContainer,
  FormLabel,
} from "./datePicker.styles";

import "./datePicker.styles.scss";

const DatePicker = ({
  name,
  error,
  touched,
  label,
  value,
  onBlur,
  setFieldValue,
  minWidthLabel,
  formControlStyle,
  formLabelStyle,
  placeholder,
  dateFormat = "d/MM/yyyy",
  disabled,
  isRequired,
}) => {
  const [open, setOpen] = useState(false);

  const CustomTimeInput = ({ value: valueCustom, onChange }) => (
    <input
      require={isRequired}
      value={valueCustom}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );

  return (
    <FormControl
      display="flex"
      isInvalid={error && touched}
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
      <Stack direction="row" flex={1} gap={0} alignItems="center">
        <DatePickerContainer onClick={() => !disabled && setOpen(true)}>
          <ReactDatePicker
            name={name}
            selected={new Date(value)}
            onChange={(date) =>
              setFieldValue((values) => ({
                ...values,
                [name]: date || new Date(),
              }))
            }
            customTimeInput={<CustomTimeInput />}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            open={open}
            onClickOutside={() => setOpen(false)}
            disabled={disabled}
          />
          <DatePickerCalendarIconContainer>
            <AiOutlineCalendar size={24} />
          </DatePickerCalendarIconContainer>
        </DatePickerContainer>
        <FormErrorMessage>{error}</FormErrorMessage>
      </Stack>
    </FormControl>
  );
};

export default DatePicker;
