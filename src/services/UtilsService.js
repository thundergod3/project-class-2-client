import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class UtilsService {
  // [POST]
  uploadFile = ({ base64EncodedFile }) =>
    HTTPMethod.post(Endpoints.uploadFile, {
      data: base64EncodedFile,
    });
}

const utilsService = new UtilsService();

export default utilsService;
