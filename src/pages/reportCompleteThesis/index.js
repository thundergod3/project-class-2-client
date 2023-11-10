import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import useThesis from "hooks/useThesis";
import useSchoolYear from "hooks/useSchoolYear";
import useSemester from "hooks/useSemester";

import Table from "components/common/Table";
import ReportFilter from "components/common/ReportFilter";

const ReportCompleteThesisPage = () => {
  const { theses, refreshThesisReportFinishThesis, isThesisLoading } =
    useThesis();
  const { schoolYears } = useSchoolYear({
    initialGet: true,
  });
  const { semesters } = useSemester({
    initialGet: true,
  });

  const schoolYearOptionList = useMemo(
    () => [
      {
        value: "",
        label: "Tất cả",
      },
      ...(schoolYears?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })) || []),
    ],
    [schoolYears?.results]
  );
  const semesterOptionList = useMemo(
    () => [
      {
        value: "",
        label: "Tất cả",
      },
      ...(semesters?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })) || []),
    ],
    [semesters?.results]
  );

  const handleGetThesisReportFinish = useCallback(
    (filter) => {
      refreshThesisReportFinishThesis(filter);
    },
    [refreshThesisReportFinishThesis]
  );

  useEffect(() => {
    handleGetThesisReportFinish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "majorName",
      label: "Tên ngành",
    },
    {
      columnId: "totalUser",
      label: "Số lượng SV đăng ký",
    },
    {
      columnId: "totalUserFinish",
      label: "Số lượng sinh viên hoàn thành",
    },
    {
      columnId: "percent",
      label: "Tỉ lệ hoàn thành (%)",
    },
  ];
  const filterFormLayoutData = [
    {
      type: "dropdown",
      name: "semesterId",
      options: semesterOptionList,
      properties: {
        label: "Kỳ học",
        placeholder: "Chọn kỳ học",
      },
    },
    {
      type: "dropdown",
      name: "schoolYearId",
      options: schoolYearOptionList,
      properties: {
        label: "Năm học",
        placeholder: "Chọn năm học",
      },
    },
  ];

  return (
    <Stack spacing="24px" paddingTop="16px">
      <Box padding="0px 24px">
        <ReportFilter
          formLayoutData={filterFormLayoutData}
          onSearch={handleGetThesisReportFinish}
        />
      </Box>
      <Table
        loading={isThesisLoading}
        columnData={columnData}
        tableData={theses?.results}
        usingPagination={false}
      />
    </Stack>
  );
};

export default ReportCompleteThesisPage;
