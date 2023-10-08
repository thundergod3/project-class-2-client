import * as Yup from "yup";

export const modifiedThesisValidation = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  dob: Yup.string().required("Vui lòng nhập ngày sinh"),
});
