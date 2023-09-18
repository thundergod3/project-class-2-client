import * as Yup from "yup";

export const modifiedFacultyValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên khoa"),
  code: Yup.string().required("Vui lòng nhập mã khoa"),
});
