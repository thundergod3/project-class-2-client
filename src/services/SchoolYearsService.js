import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class SchoolYearsService {
  // [GET]
  getSchoolYearList = (filter) =>
    HTTPMethod.get(`${Endpoints.getSchoolYearList}${filter}`);

  // [POST]
  createSchoolYear = (data) =>
    HTTPMethod.post(Endpoints.createSchoolYear, data);

  // [PUT]
  updateSchoolYear = (id, data) =>
    HTTPMethod.put(Endpoints.updateSchoolYear.replaceAll(":id", id), data);

  // [DELETE]
  deleteSchoolYear = (id) =>
    HTTPMethod.delete(Endpoints.deleteSchoolYear.replaceAll(":id", id));
}

const schoolYearsService = new SchoolYearsService();

export default schoolYearsService;
