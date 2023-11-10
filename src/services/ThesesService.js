import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class ThesesService {
  // [GET]
  getThesisList = (filter) =>
    HTTPMethod.get(`${Endpoints.getThesisList}${filter}`);
  getReportFinishThesisList = (filter) =>
    HTTPMethod.get(`${Endpoints.getReportFinishThesisList}${filter}`);
  getThesisDetail = (id) =>
    HTTPMethod.get(Endpoints.getThesisDetail.replaceAll(":id", id));

  // [POST]
  createThesis = (data) => HTTPMethod.post(Endpoints.createThesis, data);
  createFinishThesis = (data) =>
    HTTPMethod.post(Endpoints.createFinishThesis, data);

  // [PUT]
  updateThesis = (id, data) =>
    HTTPMethod.put(Endpoints.updateThesis.replaceAll(":id", id), data);
  approveThesis = (id, data) =>
    HTTPMethod.put(Endpoints.approveThesis.replaceAll(":id", id), data);
  deleteThesis = (id, body) =>
    HTTPMethod.put(Endpoints.deleteThesis.replaceAll(":id", id), body);
  assignReviewTeacher = (id, data) =>
    HTTPMethod.put(Endpoints.assignReviewTeacher.replaceAll(":id", id), data);
  updateCouncil = (id, data) =>
    HTTPMethod.put(Endpoints.updateCouncil.replaceAll(":id", id), data);
}

const thesesService = new ThesesService();

export default thesesService;
