import * as Yup from "yup";

export const modifiedOutlineValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên đề cương"),
  code: Yup.string().required("Vui lòng nhập mã đề cương"),
});
