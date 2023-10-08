import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class ReportThesesService {
  // [GET]
  getReportThesisList = (filter) =>
    HTTPMethod.get(`${Endpoints.getReportThesisList}${filter}`);

  // [POST]
  createReportThesis = (data) =>
    HTTPMethod.post(Endpoints.createReportThesis, data);

  // [PUT]
  updateReportThesis = (id, data) =>
    HTTPMethod.put(Endpoints.updateReportThesis.replaceAll(":id", id), data);

  // [DELETE]
  deleteReportThesis = (id) =>
    HTTPMethod.delete(Endpoints.deleteReportThesis.replaceAll(":id", id));
}

const reportThesesService = new ReportThesesService();

export default reportThesesService;
