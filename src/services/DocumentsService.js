import Endpoints from "constants/endpoints";
import HTTPMethod from "./index";

class DocumentsService {
  // [GET]
  getDocumentList = (filter) =>
    HTTPMethod.get(`${Endpoints.getDocumentList}${filter}`);

  // [POST]
  createDocument = (data) => HTTPMethod.post(Endpoints.createDocument, data);

  // [PUT]
  updateDocument = (id, data) =>
    HTTPMethod.put(Endpoints.updateDocument.replaceAll(":id", id), data);

  // [DELETE]
  deleteDocument = (id) =>
    HTTPMethod.delete(Endpoints.deleteDocument.replaceAll(":id", id));
}

const documentsService = new DocumentsService();

export default documentsService;
