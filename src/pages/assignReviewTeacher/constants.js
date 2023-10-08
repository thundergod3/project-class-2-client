import * as Yup from "yup";

export const modifiedMajorValidation = Yup.object({
  teacherId: Yup.string().required("Vui lòng chọn giảng viên phản biện"),
});
