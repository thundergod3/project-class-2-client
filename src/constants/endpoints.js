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

  // TEACHER
  getTeacherList: "/teacher",
  createTeacher: "/teacher/create",
  updateTeacher: "/teacher/update/:id",
  deleteTeacher: "/teacher/delete/:id",

  // MODULE
  getModuleList: "/module",
  createModule: "/module/create",
  updateModule: "/module/update/:id",
  deleteModule: "/module/delete/:id",
};

export default Endpoints;
