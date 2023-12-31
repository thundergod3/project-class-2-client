import * as Yup from "yup";

export const modifiedMajorValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên ngành học"),
  code: Yup.string().required("Vui lòng nhập mã ngành học"),
  facultyId: Yup.string().required("Vui lòng chọn khoa"),
});
