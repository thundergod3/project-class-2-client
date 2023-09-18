import * as Yup from "yup";

export const modifiedModuleValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên học phần"),
  code: Yup.string().required("Vui lòng nhập mã học phần"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
});
