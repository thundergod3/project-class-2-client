import { Box, Stack } from "@chakra-ui/react";
import React from "react";

import Table from "components/common/Table";
import ReportFilter from "components/common/ReportFilter";

const ReportCompleteThesisPage = () => {
  const fakeData = [
    {
      major: "Khoa học máy tính",
      numberUser: 30,
      numberUserFinish: 27,
      percentFinish: 90,
    },
    {
      major: "Công nghệ thông tin",
      numberUser: 45,
      numberUserFinish: 40,
      percentFinish: 80,
    },
    {
      major: "Hệ thống thông tin",
      numberUser: 23,
      numberUserFinish: 20,
      percentFinish: 95,
    },
    {
      major: "Luật kinh tế",
      numberUser: 34,
      numberUserFinish: 24,
      percentFinish: 70,
    },
    {
      major: "Marketing",
      numberUser: 14,
      numberUserFinish: 15,
      percentFinish: 98,
    },
    {
      major: "Ngôn ngữ Trung Quốc",
      numberUser: 48,
      numberUserFinish: 44,
      percentFinish: 86,
    },
    {
      major: "Điều dưỡng",
      numberUser: 25,
      numberUserFinish: 25,
      percentFinish: 100,
    },
    {
      major: "Âm nhạc ứng dụng",
      numberUser: 32,
      numberUserFinish: 30,
      percentFinish: 95,
    },
    {
      major: "Ngôn ngữ Nhật",
      numberUser: 40,
      numberUserFinish: 39,
      percentFinish: 89,
    },
  ];
  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "major",
      label: "Tên ngành",
    },
    {
      columnId: "numberUser",
      label: "Số lượng SV đăng ký",
    },
    {
      columnId: "numberUserFinish",
      label: "Số lượng sinh viên hoàn thành",
    },
    {
      columnId: "percentFinish",
      label: "Tỉ lệ hoàn thành (%)",
    },
  ];
  const semesterLít = [
    {
      value: "",
      label: "Tất cả",
    },
    {
      value: "1",
      label: "Kì 1",
    },
    {
      value: "2",
      label: "Kì 2",
    },
    {
      value: "3",
      label: "Kì 3",
    },
  ];
  const schoolYearList = [
    {
      value: "",
      label: "Tất cả",
    },
    {
      value: "1",
      label: "2019-2020",
    },
    {
      value: "2",
      label: "2020-2021",
    },
    {
      value: "3",
      label: "2021-2022",
    },
    {
      value: "4",
      label: "2022-2023",
    },
  ];
  const filterFormLayoutData = [
    {
      type: "dropdown",
      name: "semesterId",
      options: semesterLít,
      properties: {
        label: "Kỳ học",
        placeholder: "Chọn kỳ học",
      },
    },
    {
      type: "dropdown",
      name: "schoolYearId",
      options: schoolYearList,
      properties: {
        label: "Năm học",
        placeholder: "Chọn năm học",
      },
    },
  ];

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <ReportFilter formLayoutData={filterFormLayoutData} />
        </Box>
        <Table
          columnData={columnData}
          tableData={fakeData}
          totalPage={10}
          page={1}
        />
      </Stack>
    </>
  );
};

export default ReportCompleteThesisPage;
