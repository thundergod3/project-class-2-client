import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class TopicsService {
  // [GET]
  getTopicList = (filter) =>
    HTTPMethod.get(`${Endpoints.getTopicList}${filter}`);

  // [POST]
  createTopic = (data) => HTTPMethod.post(Endpoints.createTopic, data);

  // [POST]
  updateTopic = (id, data) =>
    HTTPMethod.put(Endpoints.updateTopic.replaceAll(":id", id), data);

  // [DELETE]
  deleteTopic = (id) =>
    HTTPMethod.delete(Endpoints.deleteTopic.replaceAll(":id", id));
}

const topicsService = new TopicsService();

export default topicsService;
