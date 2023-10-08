import * as Yup from "yup";

export const modifiedStudentValidation = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  name: Yup.string().required("Vui lòng nhập tên sinh viên"),
  code: Yup.string().required("Vui lòng nhập mã sinh viên"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
});
