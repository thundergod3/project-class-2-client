import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class TopicsService {
  // [GET]
  getTopicList = (filter) =>
    HTTPMethod.get(`${Endpoints.getTopicList}${filter}`);

  // [POST]
  createTopic = (data) => HTTPMethod.post(Endpoints.createTopic, data);
  proposalTopic = (data) => HTTPMethod.post(Endpoints.proposalTopic, data);

  // [PUT]
  updateTopic = (id, data) =>
    HTTPMethod.put(Endpoints.updateTopic.replaceAll(":id", id), data);
  registerTopic = (id, data) =>
    HTTPMethod.put(Endpoints.registerTopic.replaceAll(":id", id), data);
  unRegisterTopic = (id, data) =>
    HTTPMethod.put(Endpoints.unRegisterTopic.replaceAll(":id", id), data);
  approveTopic = (id) =>
    HTTPMethod.put(Endpoints.approveTopic.replaceAll(":id", id));

  // [DELETE]
  deleteTopic = (id) =>
    HTTPMethod.delete(Endpoints.deleteTopic.replaceAll(":id", id));
}

const topicsService = new TopicsService();

export default topicsService;
