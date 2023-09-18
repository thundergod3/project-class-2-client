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
    </React.Suspense>
  );
};

export default App;
