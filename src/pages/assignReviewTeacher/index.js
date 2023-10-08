import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedMajorValidation } from "./constants";
import useThesis from "hooks/useThesis";
import useTeacher from "hooks/useTeacher";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import DetailModal from "components/common/DetailModal";

const AssignReviewTeacherPage = () => {
  const { page, setPage } = usePagination();
  const {
    theses,
    isThesisLoading,
    refreshThesis,
    assignReviewTeacher,
    isModifiedThesisLoading,
  } = useThesis();
  const { teachers } = useTeacher({
    initialGet: true,
  });
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openDetail, Dialog: DialogDetail } = useModal({
    modalBody: DetailModal,
    usingFooter: false,
  });

  const teacherOptionList = useMemo(
    () =>
      teachers?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [teachers?.results]
  );

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "user",
      label: "Tên đề tài",
      render: (data) => data?.topic?.name,
    },
    {
      columnId: "user",
      label: "Mã sinh viên",
      render: (data) => data?.code,
    },
    {
      columnId: "user",
      label: "Ngành",
      render: (data) => data?.faculty?.name,
    },
    {
      columnId: "action",
      label: "Thao tác",
      render: (_, data) => (
        <Text
          textAlign="center"
          color="text.secondary"
          textDecoration="underline"
          cursor="pointer"
          onClick={() =>
            (data?.teacher ? openDetail : open)({
              title: data?.teacher
                ? "Thông tin giảng viên phản biện"
                : "Phân công giảng viên phản biện",
              data: {
                id: data?.id,
                topicName: data?.user?.topic?.name,
                userCode: data?.user?.topic?.name,
                facultyName: data?.user?.faculty?.name,
                teacher: data?.teacher,
              },
            })
          }>
          {data?.teacher ? "Xem" : "Phân công"}
        </Text>
      ),
    },
  ];
  const formLayoutData = [
    {
      type: "input",
      name: "topicName",
      properties: {
        label: "Tên đề tài",
        minWidthLabel: "150px",
        readOnly: true,
      },
    },
    {
      type: "input",
      name: "userCode",
      properties: {
        label: "Mã sinh viên",
        minWidthLabel: "150px",
        readOnly: true,
      },
    },
    {
      type: "input",
      name: "facultyName",
      properties: {
        label: "Ngành",
        minWidthLabel: "150px",
        readOnly: true,
      },
    },
    {
      type: "dropdown",
      name: "teacherId",
      options: teacherOptionList,
      properties: {
        label: "Giáo viên phản biện",
        placeholder: "Chọn giáo viên",
        minWidthLabel: "150px",
      },
    },
  ];
  const detailList = [
    {
      value: "topicName",
      label: "Tên đề tài:",
    },
    {
      value: "userCode",
      label: "Mã sinh viên",
    },
    {
      value: "facultyName",
      label: "Ngành",
    },
    {
      value: "teacher",
      label: "Giáo viên phản biện",
      customValue: (data) => data?.name,
    },
  ];

  const handleGetThesis = useCallback(
    (keyword) => {
      refreshThesis({
        page,
        status: "approve",
        keyword,
      });
    },
    [page, refreshThesis]
  );

  const handleModifiedThesis = useCallback(
    async (values) => {
      await assignReviewTeacher(values?.id, {
        teacherId: values?.teacherId,
      });

      handleGetThesis();

      return true;
    },
    [assignReviewTeacher, handleGetThesis]
  );

  useEffect(() => {
    handleGetThesis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên đề tài, mã đề tài"
            onSearch={(keyword) => handleGetThesis(keyword)}
            hideCreateBtn
          />
        </Box>
        <Table
          loading={isThesisLoading}
          totalPage={theses?.total}
          columnData={columnData}
          tableData={theses?.results}
          page={page}
          setPage={setPage}
        />
      </Stack>
      <Dialog
        onSave={handleModifiedThesis}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedMajorValidation}
        isLoading={isModifiedThesisLoading}
      />
      <DialogDetail detailList={detailList} />
    </>
  );
};

export default AssignReviewTeacherPage;
