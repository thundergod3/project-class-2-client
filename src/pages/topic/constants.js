import * as Yup from "yup";

export const modifiedTopicValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên tên sinh viên"),
  code: Yup.string().required("Vui lòng nhập mã sinh viên"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
  requirement: Yup.string().required("Vui lòng điền yêu cầu"),
});