import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class UsersService {
  // [GET]
  getUserList = (filter) => HTTPMethod.get(`${Endpoints.getUserList}${filter}`);

  // [POST]
  createUser = (data) => HTTPMethod.post(Endpoints.createUser, data);

  // [POST]
  updateUser = (id, data) =>
    HTTPMethod.put(Endpoints.updateUser.replaceAll(":id", id), data);

  // [DELETE]
  deleteUser = (id) =>
    HTTPMethod.delete(Endpoints.deleteUser.replaceAll(":id", id));
}

const usersService = new UsersService();

export default usersService;
