import { Box, Stack } from "@chakra-ui/react";
import React, { useMemo } from "react";

import useFaculty from "hooks/useFaculty";

import Table from "components/common/Table";
import ReportFilter from "components/common/ReportFilter";

const ReportNumberStudentOfTeacherPage = () => {
  const { faculties } = useFaculty({
    initialGet: true,
  });

  const facultyOptionList = useMemo(
    () =>
      faculties?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [faculties?.results]
  );

  const fakeData = [
    {
      teacher: "Teacher 1",
      semesterOne: 30,
      semesterTwo: 27,
      semesterThree: 90,
    },
    {
      teacher: "Teacher 2",
      semesterOne: 45,
      semesterTwo: 40,
      semesterThree: 80,
    },
    {
      teacher: "Teacher 3",
      semesterOne: 23,
      semesterTwo: 20,
      semesterThree: 95,
    },
    {
      teacher: "Teacher 4",
      semesterOne: 34,
      semesterTwo: 24,
      semesterThree: 70,
    },
    {
      teacher: "Teacher 5",
      semesterOne: 14,
      semesterTwo: 15,
      semesterThree: 98,
    },
    {
      teacher: "Teacher 6",
      semesterOne: 48,
      semesterTwo: 44,
      semesterThree: 86,
    },
    {
      teacher: "Teacher 7",
      semesterOne: 25,
      semesterTwo: 25,
      semesterThree: 100,
    },
    {
      teacher: "Teacher 8",
      semesterOne: 32,
      semesterTwo: 30,
      semesterThree: 95,
    },
    {
      teacher: "Teacher 9",
      semesterOne: 40,
      semesterTwo: 39,
      semesterThree: 89,
    },
  ];
  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "teacher",
      label: "Tên giảng viên",
    },
    {
      columnId: "semesterOne",
      label: "SLSV hướng dẫn kỳ 1",
    },
    {
      columnId: "semesterTwo",
      label: "SLSV hướng dẫn kỳ 2",
    },
    {
      columnId: "semesterThree",
      label: "SLSV hướng dẫn kỳ 3",
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
      name: "facultyId",
      options: facultyOptionList,
      properties: {
        label: "Khoa",
        placeholder: "Chọn khoa",
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

export default ReportNumberStudentOfTeacherPage;
