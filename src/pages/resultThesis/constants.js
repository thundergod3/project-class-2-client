import * as Yup from "yup";

export const modifiedThesisValidation = Yup.object({
  userCode: Yup.string().required("Vui lòng nhập mã sinh viên"),
  result: Yup.string().required("Vui lòng chọn kết quả"),
  score: Yup.number().required("Vui lòng nhập điểm"),
});

export const resultsList = [
  {
    value: "notComplete",
    label: "Không hoàn thành",
  },
  {
    value: "complete",
    label: "Hoàn thành",
  },
];
