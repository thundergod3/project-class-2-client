const Endpoints = {
  // FACULTY
  getFacultyList: "/faculties",
  createFaculty: "/faculties/create",
  updateFaculty: "/faculties/update/:id",
  deleteFaculty: "/faculties/delete/:id",

  // MAJOR
  getMajorList: "/majors",
  createMajor: "/majors/create",
  updateMajor: "/majors/update/:id",
  deleteMajor: "/majors/delete/:id",

  // USER
  getUserList: "/users",
  createUser: "/users/create",
  updateUser: "/users/update/:id",
  deleteUser: "/users/delete/:id",

  // MODULE
  getModuleList: "/modules",
  createModule: "/modules/create",
  updateModule: "/modules/update/:id",
  deleteModule: "/modules/delete/:id",

  // DOCUMENT
  getDocumentList: "/documents",
  createDocument: "/documents/create",
  updateDocument: "/documents/update/:id",
  deleteDocument: "/documents/delete/:id",

  // TOPIC
  getTopicList: "/topics",
  createTopic: "/topics/create",
  updateTopic: "/topics/update/:id",
  deleteTopic: "/topics/delete/:id",
  registerTopic: "/topics/register/:id",
  unRegisterTopic: "/topics/un-register/:id",
  proposalTopic: "/topics/proposal",
  approveTopic: "/topics/approve/:id",

  // OUTLINE
  getOutlineList: "/outlines",
  createOutline: "/outlines/create",
  updateOutline: "/outlines/update/:id",
  deleteOutline: "/outlines/delete/:id",

  // AUTH
  myProfile: "/auth/my-profile",
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
};

export default Endpoints;
