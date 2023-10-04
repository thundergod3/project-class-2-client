import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class OutlinesService {
  // [GET]
  getOutlineList = (filter) =>
    HTTPMethod.get(`${Endpoints.getOutlineList}${filter}`);

  // [POST]
  createOutline = (data) => HTTPMethod.post(Endpoints.createOutline, data);

  // [PUT]
  updateOutline = (id, data) =>
    HTTPMethod.put(Endpoints.updateOutline.replaceAll(":id", id), data);

  // [DELETE]
  deleteOutline = (id) =>
    HTTPMethod.delete(Endpoints.deleteOutline.replaceAll(":id", id));
}

const outlinesService = new OutlinesService();

export default outlinesService;
