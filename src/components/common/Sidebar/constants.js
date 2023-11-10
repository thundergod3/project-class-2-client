import { Routes } from "constants/routes";

export const navLinksAdmin = [
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
      {
        route: Routes.students,
        title: "Quản lý Sinh viên",
      },
      {
        route: Routes.documents,
        title: "Quản lý Tài liệu tham khảo",
      },
      {
        route: Routes.topics,
        title: "Quản lý đề tài hướng dẫn KLTN",
      },
      {
        route: Routes.theses,
        title: "Quản lý bảo vệ KLTN",
      },
      {
        route: Routes.assignReviewTeachers,
        title: "Phân công giảng viên phản biện",
      },
      {
        route: Routes.councils,
        title: "Quản lý hội đồng bảo vệ",
      },
      {
        route: Routes.reportTheses,
        title: "Quản lý biên bản KLTN",
      },
      {
        route: Routes.resultTheses,
        title: "Quản lý kết quả KLTN",
      },
      {
        route: Routes.schoolYears,
        title: "Quản lý năm học",
      },
      {
        route: Routes.semesters,
        title: "Quản lý kỳ học",
      },
    ],
  },
  {
    title: "Báo cáo thống kê",
    items: [
      {
        route: Routes.reportCompleteTheses,
        title: "Báo cáo tỉ lệ hoàn thành",
      },
      {
        route: Routes.reportNumberStudentOfTeacher,
        title: "Báo cáo số lượng sinh viên hướng dẫn của từng giảng viên",
      },
    ],
  },
];

export const navLinksTeacher = [
  {
    title: "Quản lý Danh Mục",
    items: [
      {
        route: Routes.topics,
        title: "Quản lý đề tài hướng dẫn KLTN",
      },
      {
        route: Routes.approveTopics,
        title: "Quản lý kiểm duyệt đề tài",
      },
      {
        route: Routes.outlines,
        title: "Quản lý đề cương",
      },
    ],
  },
];

export const navLinksStudent = [
  {
    title: "Quản lý Danh Mục",
    items: [
      {
        route: Routes.topics,
        title: "Quản lý đề tài hướng dẫn KLTN",
      },
      {
        route: Routes.chooseTopics,
        title: "Lựa chọn đề tài",
      },
      {
        route: Routes.proposalTopics,
        title: "Đề xuất đề tài",
      },
      {
        route: Routes.outlines,
        title: "Quản lý đề cương",
      },
      {
        route: Routes.registerThesis,
        title: "Đăng ký bảo vệ KLTN",
      },
    ],
  },
];
