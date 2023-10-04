import * as Yup from "yup";

export const loginValidation = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});
