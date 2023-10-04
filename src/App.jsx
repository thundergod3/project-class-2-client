import React, { lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Switch } from "react-router-dom";

import { Routes } from "constants/routes";

import PublicRoute from "components/layout/PublicRoute";
import PrivateRoute from "components/layout/PrivateRoute";
import MainLayout from "components/layout/MainLayout";
import AuthenticationLayout from "components/layout/AuthenticationLayout";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";
import useAuthenticated from "hooks/useAuthenticated";

// Lazy Pages
const Homepage = lazy(() => import("./pages/homepage"));
const FacultyPage = lazy(() => import("./pages/faculty"));
const MajorPage = lazy(() => import("./pages/major"));
const TeacherPage = lazy(() => import("./pages/teacher"));
const ModulePage = lazy(() => import("./pages/module"));
const StudentPage = lazy(() => import("./pages/student"));
const DocumentPage = lazy(() => import("./pages/document"));
const TopicPage = lazy(() => import("./pages/topic"));
const ChooseTopicPage = lazy(() => import("./pages/chooseTopic"));
const OutlinePage = lazy(() => import("./pages/outline"));
const LoginPage = lazy(() => import("./pages/login"));
const ProposalTopicPage = lazy(() => import("./pages/proposalTopic"));
const ApproveTopicPage = lazy(() => import("./pages/approveTopic"));

const App = () => {
  const { getUserData } = useAuthenticated();

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Suspense fallback={<></>}>
      {/* COMMON COMPONENT */}
      <ToastContainer />

      <Switch>
        {/* ROUTES */}
        {/* PRIVATE */}
        <PublicRoute
          exact
          path={Routes.login}
          component={LoginPage}
          layout={AuthenticationLayout}
        />

        {/* COMMON */}
        <PrivateRoute
          exact
          path={Routes.home}
          component={Homepage}
          layout={MainLayout}
        />
        <PrivateRoute
          exact
          path={Routes.faculties}
          component={FacultyPage}
          layout={MainLayout}
          title="Quản lý Khoa"
        />
        <PrivateRoute
          exact
          path={Routes.majors}
          component={MajorPage}
          layout={MainLayout}
          title="Quản lý Ngành học"
        />
        <PrivateRoute
          exact
          path={Routes.teachers}
          component={TeacherPage}
          layout={MainLayout}
          title="Quản lý Giáo viên"
        />
        <PrivateRoute
          exact
          path={Routes.modules}
          component={ModulePage}
          layout={MainLayout}
          title="Quản lý các học phần KLTN"
        />
        <PrivateRoute
          exact
          path={Routes.students}
          component={StudentPage}
          layout={MainLayout}
          title="Quản lý Sinh viên"
        />
        <PrivateRoute
          exact
          path={Routes.documents}
          component={DocumentPage}
          layout={MainLayout}
          title="Quản lý Tài liệu tham khảo"
        />
        <PrivateRoute
          exact
          path={Routes.topics}
          component={TopicPage}
          layout={MainLayout}
          title="Quản lý đề tài hướng dẫn KLTN"
        />
        <PrivateRoute
          exact
          path={Routes.chooseTopics}
          component={ChooseTopicPage}
          layout={MainLayout}
          title="Lựa chọn đề tài"
        />
        <PrivateRoute
          exact
          path={Routes.outlines}
          component={OutlinePage}
          layout={MainLayout}
          title="Quản lý đề cương KLTN"
        />
        <PrivateRoute
          exact
          path={Routes.proposalTopics}
          component={ProposalTopicPage}
          layout={MainLayout}
          title="Đề xuất đề tài"
        />
        <PrivateRoute
          exact
          path={Routes.approveTopics}
          component={ApproveTopicPage}
          layout={MainLayout}
          title="Quản lý kiểm duyệt đề tài KLTN"
        />
      </Switch>
    </React.Suspense>
  );
};

export default App;
