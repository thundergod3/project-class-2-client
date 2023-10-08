import * as Yup from "yup";

export const modifiedMajorValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên hội đồng"),
  members: Yup.array().required("Vui lòng chọn thành viên"),
  time: Yup.string().required("Vui lòng nhập chọn thời gian"),
  location: Yup.string().required("Vui lòng nhập địa điểm"),
});
