import * as Yup from "yup";

export const modifiedSchoolYearValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập năm"),
  code: Yup.string().required("Vui lòng nhập mã năm học"),
});
