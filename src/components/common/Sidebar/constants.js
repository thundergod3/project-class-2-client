import { Routes } from "constants/routes";

export const navLinks = [
  {
    title: "Quản lý Danh Mục",
    items: [
      {
        route: Routes.faculties,
        title: "Quản lý Khoa",
      },
      {
        route: Routes.majors,
        title: "Quản lý Ngành học",
      },
      {
        route: Routes.teachers,
        title: "Quản lý Giáo viên",
      },
      {
        route: Routes.modules,
        title: "Quản lý các học phần KLTN",
      },
    ],
  },
  {
    title: "Quản trị",
    items: [
      {
        route: "",
        title: "Quản lý Người dùng",
      },
      {
        route: "",
        title: "Quản lý Nhóm người dùng",
      },
      {
        route: "",
        title: "Quản lý Nhóm quyền",
      },
    ],
  },
  {
    title: "Báo cáo thống kê",
    items: [
      {
        route: "",
        title: "Báo cáo",
      },
    ],
  },
];
