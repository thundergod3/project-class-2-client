const Endpoints = {
  // FACULTY
  getFacultyList: "/faculty",
  createFaculty: "/faculty/create",
  updateFaculty: "/faculty/update/:id",
  deleteFaculty: "/faculty/delete/:id",

  // MAJOR
  getMajorList: "/major",
  createMajor: "/major/create",
  updateMajor: "/major/update/:id",
  deleteMajor: "/major/delete/:id",

  // USER
  getUserList: "/user",
  createUser: "/user/create",
  updateUser: "/user/update/:id",
  deleteUser: "/user/delete/:id",

  // MODULE
  getModuleList: "/module",
  createModule: "/module/create",
  updateModule: "/module/update/:id",
  deleteModule: "/module/delete/:id",

  // DOCUMENT
  getDocumentList: "/document",
  createDocument: "/document/create",
  updateDocument: "/document/update/:id",
  deleteDocument: "/document/delete/:id",

  // TOPIC
  getTopicList: "/topic",
  createTopic: "/topic/create",
  updateTopic: "/topic/update/:id",
  deleteTopic: "/topic/delete/:id",
};

export default Endpoints;
