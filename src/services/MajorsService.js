import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class MajorsService {
  // [GET]
  getMajorList = (filter) =>
    HTTPMethod.get(`${Endpoints.getMajorList}${filter}`);

  // [POST]
  createMajor = (data) => HTTPMethod.post(Endpoints.createMajor, data);

  // [PUT]
  updateMajor = (id, data) =>
    HTTPMethod.put(Endpoints.updateMajor.replaceAll(":id", id), data);

  // [DELETE]
  deleteMajor = (id) =>
    HTTPMethod.delete(Endpoints.deleteMajor.replaceAll(":id", id));
}

const majorsService = new MajorsService();

export default majorsService;
