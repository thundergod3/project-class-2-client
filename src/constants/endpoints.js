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
  approveProposalTopic: "/topics/approve-proposal/:id",

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

  // THESIS
  getThesisList: "/theses",
  getThesisDetail: "/theses/:id",
  createThesis: "/theses/create",
  updateThesis: "/theses/update/:id",
  approveThesis: "/theses/approve/:id",
  deleteThesis: "/theses/delete/:id",
  createFinishThesis: "/theses/create-finish",
  assignReviewTeacher: "/theses/assign-teacher/:id",
  updateCouncil: "/theses/council/:id",

  // REPORT THESIS
  getReportThesisList: "/report-theses",
  createReportThesis: "/report-theses/create",
  updateReportThesis: "/report-theses/update/:id",
  deleteReportThesis: "/report-theses/delete/:id",

  // UTILS
  uploadFile: "/upload",

  // SCHOOL YEARS
  getSchoolYearList: "/schoolYears",
  createSchoolYear: "/schoolYears/create",
  updateSchoolYear: "/schoolYears/update/:id",
  deleteSchoolYear: "/schoolYears/delete/:id",

  // SEMESTERS
  getSemesterList: "/semesters",
  createSemester: "/semesters/create",
  updateSemester: "/semesters/update/:id",
  deleteSemester: "/semesters/delete/:id",
};

export default Endpoints;
