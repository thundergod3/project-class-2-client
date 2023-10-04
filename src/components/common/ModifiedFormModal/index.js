import { useFormik } from "formik";
import React, { Fragment, useCallback, useMemo } from "react";
import { Button, Stack } from "@chakra-ui/react";

import InputField from "components/common/InputField";
import SelectField from "../SelectField";

const ModifiedFormModal = ({
  onOriginalClose,
  onSave,
  data,
  formLayoutData,
  formValidationSchema,
  isLoading,
}) => {
  const initialValues = useMemo(() => {
    const objects = {};

    formLayoutData?.forEach((record) => {
      objects[record?.name] = data?.[record?.name] || "";
    });

    if (data?.id) {
      objects.id = data?.id;
    }

    return objects;
  }, [data, formLayoutData]);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      const result = await onSave?.(values);

      if (result) {
        onOriginalClose();
      }
    },
    validationSchema: formValidationSchema,
  });

  const renderForm = useCallback(
    (form) => {
      let component = <></>;

      switch (form?.type) {
        case "input": {
          component = (
            <InputField
              label={form?.properties?.label}
              name={form?.name}
              value={values?.[form?.name]}
              touched={touched?.[form?.name]}
              error={errors?.[form?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              w="full"
              minWidthLabel={form?.properties?.minWidthLabel}
            />
          );

          break;
        }

        case "textarea": {
          component = (
            <InputField
              label={form?.properties?.label}
              name={form?.name}
              value={values?.[form?.name]}
              touched={touched?.[form?.name]}
              error={errors?.[form?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              w="full"
              minWidthLabel={form?.properties?.minWidthLabel}
              usingTextArea
            />
          );

          break;
        }

        case "dropdown": {
          component = (
            <SelectField
              placeholder={form?.properties?.placeholder}
              label={form?.properties?.label}
              name={form?.name}
              value={values?.[form?.name]}
              touched={touched?.[form?.name]}
              error={errors?.[form?.name]}
              onChange={(event) =>
                setValues({
                  ...values,
                  [form?.name]: event.target.value,
                })
              }
              onBlur={handleBlur}
              optionList={form?.options || []}
              isRequired
              w="full"
              minWidthLabel={form?.properties?.minWidthLabel}
              direction="row"
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
    [errors, handleBlur, handleChange, setValues, touched, values]
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputField hidden name="id" />
      <Stack spacing="63px">
        <Stack spacing="45px">{formLayoutData?.map(renderForm)}</Stack>
        <Stack direction="row" spacing="8px" justifyContent="flex-end">
          <Button variant="ghost" mr={3} onClick={onOriginalClose}>
            Huỷ bỏ
          </Button>
          <Button
            isLoading={isLoading}
            type="submit"
            background="background.primary"
            color="white"
            _hover={{
              background: "background.primary",
            }}>
            Lưu
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ModifiedFormModal;
