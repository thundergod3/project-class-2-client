import * as Yup from "yup";

export const modifiedTopicValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên đề tài"),
  code: Yup.string().required("Vui lòng nhập mã đề tài"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
  schoolYearId: Yup.string().required("Vui lòng chọn khoá"),
  requirement: Yup.string().required("Vui lòng điền yêu cầu"),
});
