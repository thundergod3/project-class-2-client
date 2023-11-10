import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { Fragment, useCallback, useMemo } from "react";

import SelectField from "../SelectField";
import { useFormik } from "formik";

const ReportFilter = ({ formLayoutData, isLoading, onSearch }) => {
  const initialValues = useMemo(() => {
    const objects = {};

    formLayoutData?.forEach((record) => {
      objects[record?.name] = "";
    });

    return objects;
  }, [formLayoutData]);

  const { handleSubmit, values, handleBlur, touched, errors, setValues } =
    useFormik({
      enableReinitialize: true,
      initialValues,
      onSubmit: async (values) => {
        onSearch?.(values);
      },
    });

  const renderForm = useCallback(
    (form) => {
      let component = <></>;

      switch (form?.type) {
        case "dropdown": {
          component = (
            <SelectField
              placeholder={form?.properties?.placeholder}
              label={form?.properties?.label}
              name={form?.name}
              value={
                form?.properties?.isMulti
                  ? values?.[form?.name]
                  : form?.options?.find(
                      (record) => record?.value === values?.[form?.name]
                    )
              }
              touched={touched?.[form?.name]}
              error={errors?.[form?.name]}
              onChange={(value) =>
                setValues({
                  ...values,
                  [form?.name]: form?.properties?.isMulti
                    ? value
                    : value?.value,
                })
              }
              onBlur={handleBlur}
              optionList={form?.options || []}
              isRequired
              w="full"
              minWidthLabel={form?.properties?.minWidthLabel}
              direction="row"
              isMulti={form?.properties?.isMulti}
              formControlStyle={{
                flexDirection: "column",
                minWidth: 270,
              }}
            />
          );

          break;
        }

        default:
          component = <></>;

          break;
      }

      return <Fragment key={form?.name}>{component}</Fragment>;
    },
    [errors, handleBlur, setValues, touched, values]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4px">
        <Text color="#1D2939" fontSize="16px" fontWeight={500}>
          Bộ lọc
        </Text>
        <Flex alignItems="flex-end" gap="52px">
          <Flex alignItems="center" gap="16px">
            {formLayoutData?.map(renderForm)}
          </Flex>
          <Flex alignItems="center" gap="28px">
            <Button
              isLoading={isLoading}
              type="submit"
              background="background.secondary"
              color="white"
              _hover={{
                background: "background.secondary",
              }}>
              Tìm kiếm
            </Button>
          </Flex>
        </Flex>
      </Stack>
    </form>
  );
};

export default ReportFilter;
