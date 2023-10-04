import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class ModulesService {
  // [GET]
  getModuleList = (filter) =>
    HTTPMethod.get(`${Endpoints.getModuleList}${filter}`);

  // [POST]
  createModule = (data) => HTTPMethod.post(Endpoints.createModule, data);

  // [PUT]
  updateModule = (id, data) =>
    HTTPMethod.put(Endpoints.updateModule.replaceAll(":id", id), data);

  // [DELETE]
  deleteModule = (id) =>
    HTTPMethod.delete(Endpoints.deleteModule.replaceAll(":id", id));
}

const modulesService = new ModulesService();

export default modulesService;
