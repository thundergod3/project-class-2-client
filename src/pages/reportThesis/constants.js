import * as Yup from "yup";

export const modifiedReportThesisValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên biên bản"),
  userCode: Yup.string().required("Vui lòng nhập mã sinh viên"),
});
