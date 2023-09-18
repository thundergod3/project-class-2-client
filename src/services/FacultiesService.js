import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class FacultiesService {
  // [GET]
  getFacultyList = (filter) =>
    HTTPMethod.get(`${Endpoints.getFacultyList}${filter}`);

  // [POST]
  createFaculty = (data) => HTTPMethod.post(Endpoints.createFaculty, data);

  // [POST]
  updateFaculty = (id, data) =>
    HTTPMethod.put(Endpoints.updateFaculty.replaceAll(":id", id), data);

  // [DELETE]
  deleteFaculty = (id) =>
    HTTPMethod.delete(Endpoints.deleteFaculty.replaceAll(":id", id));
}

const facultiesService = new FacultiesService();

export default facultiesService;
