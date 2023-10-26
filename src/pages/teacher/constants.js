import * as Yup from "yup";

export const modifiedTeacherValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên giáo viên"),
  code: Yup.string().required("Vui lòng nhập mã giáo viên"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
});
