import { Button, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";

import useAuthenticated from "hooks/useAuthenticated";
import { modifiedThesisValidation } from "./constants";
import useSchoolYear from "hooks/useSchoolYear";

import InputField from "components/common/InputField";
import DatePicker from "components/common/DatePicker";
import useThesis from "hooks/useThesis";
import FileUpload from "components/common/FileUpload";
import SelectField from "components/common/SelectField";

const RegisterThesisPage = () => {
  const { userData, getUserData } = useAuthenticated();
  const {
    isModifiedThesisLoading,
    getThesisDetail,
    createThesis,
    updateThesis,
  } = useThesis();
  const { schoolYears } = useSchoolYear({
    initialGet: true,
  });

  const userThesisId = useMemo(() => userData?.thesisId, [userData?.thesisId]);
  const initialValues = useMemo(
    () => ({
      fullName: userThesisId ? userData?.fullName : "",
      dob: userData?.dob || new Date(),
    }),
    [userData?.dob, userData?.fullName, userThesisId]
  );
  const schoolYearOptionList = useMemo(
    () =>
      schoolYears?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [schoolYears?.results]
  );

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
    errors,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      const body = {
        ...values,
        dob: new Date(values?.dob).toISOString(),
      };

      if (userThesisId) {
        await updateThesis(userThesisId, body);
      } else {
        await createThesis({
          ...body,
          status: "approve",
        });
      }

      await getUserData();
    },
    validationSchema: modifiedThesisValidation,
  });

  useEffect(() => {
    if (userThesisId) {
      getThesisDetail(userThesisId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userThesisId]);

  useEffect(() => {
    if (userData) {
      setFieldValue("userCode", userData?.code);
      setFieldValue("userFacultyCode", userData?.faculty?.code);
      setFieldValue("fullName", userData?.fullName);
      setFieldValue("schoolYearId", userData?.schoolYearId);
      setFieldValue("fullName", userData?.name);
    }
  }, [setFieldValue, userData]);

  return (
    <Stack spacing="24px" padding={8} maxWidth="620px">
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <Text fontSize="32px" color="text.secondary">
            {userThesisId ? "Chỉnh sửa bảo vệ KLTN" : "Đăng ký KLTN"}
          </Text>
          <InputField
            label="Họ và tên"
            name="fullName"
            value={values?.fullName}
            touched={touched?.fullName}
            error={errors?.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            w="full"
            minWidthLabel="100px"
          />
          <InputField
            label="Mã sinh viên"
            name="userCode"
            value={values?.userCode}
            isRequired
            w="full"
            minWidthLabel="100px"
            readOnly
          />
          <DatePicker
            isRequired
            name="dob"
            label="Ngày sinh"
            value={values.dob}
            touched={touched.dob}
            error={errors.dob}
            setFieldValue={setValues}
            onBlur={handleBlur}
            minWidthLabel="100px"
          />
          <InputField
            label="Mã ngành học"
            name="userFacultyCode"
            value={values.userFacultyCode}
            isRequired
            w="full"
            minWidthLabel="100px"
            readOnly
          />
          <SelectField
            label="Năm học"
            name="schoolYearId"
            value={schoolYearOptionList?.find(
              (record) => record?.value === values?.schoolYearId
            )}
            touched={touched?.schoolYearId}
            error={errors?.schoolYearId}
            onChange={(value) => setFieldValue("schoolYearId", value?.value)}
            onBlur={handleBlur}
            optionList={schoolYearOptionList}
            isRequired
            w="full"
            minWidthLabel="100px"
            direction="row"
            placeholder="Chọn năm học"
          />
          <FileUpload
            name="file"
            label="File đề cương"
            isRequired
            w="full"
            minWidthLabel="100px"
            setFieldValue={setValues}
          />
          <Button
            isLoading={isModifiedThesisLoading}
            type="submit"
            background="background.primary"
            color="white"
            _hover={{
              background: "background.primary",
            }}
            width="fit-content"
            alignSelf="flex-end">
            {userData?.thesisId ? "Cập nhật" : "Đăng ký"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default RegisterThesisPage;
