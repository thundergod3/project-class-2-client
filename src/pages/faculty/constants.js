import * as Yup from "yup";

export const modifiedFacultyValidation = Yup.object({
  code: Yup.string().required("Vui lòng nhập mã khoa"),
  name: Yup.string().required("Vui lòng nhập tên khoa"),
});
