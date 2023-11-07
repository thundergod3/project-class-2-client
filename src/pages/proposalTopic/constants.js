import * as Yup from "yup";

export const modifiedTopicValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sinh viên"),
  code: Yup.string().required("Vui lòng nhập mã sinh viên"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
  reason: Yup.string().required("Vui lòng điền lý do"),
});
