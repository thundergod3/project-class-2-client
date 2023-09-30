import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";

import { Routes } from "constants/routes";

import PublicRoute from "components/layout/PublicRoute";
import MainLayout from "components/layout/MainLayout";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

// Lazy Pages
const Homepage = lazy(() => import("./pages/homepage"));
const FacultyPage = lazy(() => import("./pages/faculty"));
const MajorPage = lazy(() => import("./pages/major"));
const TeacherPage = lazy(() => import("./pages/teacher"));
const ModulePage = lazy(() => import("./pages/module"));
const StudentPage = lazy(() => import("./pages/student"));
const DocumentPage = lazy(() => import("./pages/document"));
const TopicPage = lazy(() => import("./pages/topic"));

const App = () => {
  return (
    <React.Suspense fallback={<></>}>
      {/* COMMON COMPONENT */}
      <ToastContainer />

      {/* ROUTES */}
      <PublicRoute
        exact
        path={Routes.home}
        component={Homepage}
        layout={MainLayout}
      />
      <PublicRoute
        exact
        path={Routes.faculties}
        component={FacultyPage}
        layout={MainLayout}
        title="Quản lý Khoa"
      />
      <PublicRoute
        exact
        path={Routes.majors}
        component={MajorPage}
        layout={MainLayout}
        title="Quản lý Ngành học"
      />
      <PublicRoute
        exact
        path={Routes.teachers}
        component={TeacherPage}
        layout={MainLayout}
        title="Quản lý Giáo viên"
      />
      <PublicRoute
        exact
        path={Routes.modules}
        component={ModulePage}
        layout={MainLayout}
        title="Quản lý các học phần KLTN"
      />
      <PublicRoute
        exact
        path={Routes.students}
        component={StudentPage}
        layout={MainLayout}
        title="Quản lý Sinh viên"
      />
      <PublicRoute
        exact
        path={Routes.documents}
        component={DocumentPage}
        layout={MainLayout}
        title="Quản lý Tài liệu tham khảo"
      />
      <PublicRoute
        exact
        path={Routes.topics}
        component={TopicPage}
        layout={MainLayout}
        title="Quản lý đề tài hướng dẫn KLTN"
      />
    </React.Suspense>
  );
};

export default App;
