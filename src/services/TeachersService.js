import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class TeachersService {
  // [GET]
  getTeacherList = (filter) =>
    HTTPMethod.get(`${Endpoints.getTeacherList}${filter}`);

  // [POST]
  createTeacher = (data) => HTTPMethod.post(Endpoints.createTeacher, data);

  // [POST]
  updateTeacher = (id, data) =>
    HTTPMethod.put(Endpoints.updateTeacher.replaceAll(":id", id), data);

  // [DELETE]
  deleteTeacher = (id) =>
    HTTPMethod.delete(Endpoints.deleteTeacher.replaceAll(":id", id));
}

const teachersService = new TeachersService();

export default teachersService;
