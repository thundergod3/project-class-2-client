import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class SemestersService {
  // [GET]
  getSemesterList = (filter) =>
    HTTPMethod.get(`${Endpoints.getSemesterList}${filter}`);

  // [POST]
  createSemester = (data) => HTTPMethod.post(Endpoints.createSemester, data);

  // [PUT]
  updateSemester = (id, data) =>
    HTTPMethod.put(Endpoints.updateSemester.replaceAll(":id", id), data);

  // [DELETE]
  deleteSemester = (id) =>
    HTTPMethod.delete(Endpoints.deleteSemester.replaceAll(":id", id));
}

const semestersService = new SemestersService();

export default semestersService;
