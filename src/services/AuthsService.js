import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class AuthsService {
  // [GET]
  myProfile = () => HTTPMethod.get(Endpoints.myProfile);

  // [POST]
  login = (data) => HTTPMethod.post(Endpoints.login, data);
  register = (data) => HTTPMethod.post(Endpoints.register, data);
  forgotPassword = (data) => HTTPMethod.post(Endpoints.forgotPassword, data);
  resetPassword = (data) => HTTPMethod.post(Endpoints.resetPassword, data);
}

const authsService = new AuthsService();

export default authsService;
