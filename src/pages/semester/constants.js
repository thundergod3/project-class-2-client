import * as Yup from "yup";

export const modifiedSemesterValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên kỳ học"),
  schoolYearId: Yup.string().required("Vui lòng chọn năm học"),
});
