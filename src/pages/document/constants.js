import * as Yup from "yup";

export const modifiedDocumentValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên tài liệu"),
  code: Yup.string().required("Vui lòng nhập mã tài liệu"),
});
