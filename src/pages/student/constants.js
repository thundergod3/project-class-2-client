import * as Yup from "yup";

export const modifiedStudentValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sinh viên"),
  code: Yup.string().required("Vui lòng nhập mã sinh viên"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
  majorId: Yup.string().required("Vui lòng chọn ngành"),
  schoolYearId: Yup.string().required("Vui lòng chọn năm học"),
  semesterId: Yup.string().required("Vui lòng chọn kỳ học"),
});
