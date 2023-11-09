import { Stack, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

import { loginValidation } from "./constants";
import useAuthenticated from "hooks/useAuthenticated";

import InputField from "components/common/InputField";

const LoginPage = () => {
  const { login } = useAuthenticated();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: async (values) => {
        await login(values);
      },
      validationSchema: loginValidation,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <InputField
          label="Tên đăng nhập"
          name="username"
          value={values?.username}
          touched={touched?.username}
          error={errors?.username}
          onChange={handleChange}
          onBlur={handleBlur}
          isRequired
          w="full"
          minWidthLabel="120px"
        />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={values?.password}
          touched={touched?.password}
          error={errors?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isRequired
          w="full"
          minWidthLabel="120px"
        />
        <Stack spacing={6} alignItems="center">
          <Button
            width="fit-content"
            type="submit"
            variant="ghost"
            background="background.secondary"
            _hover={{
              background: "background.secondary",
            }}
            color="white"
            fontWeight="bold"
            minW="200px">
            Đăng nhập
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginPage;
