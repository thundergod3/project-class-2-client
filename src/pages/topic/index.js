import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedTopicValidation } from "./constants";
import useFaculty from "hooks/useFaculty";
import useMajor from "hooks/useMajor";
import useTopic from "hooks/useTopic";
import useAuthenticated from "hooks/useAuthenticated";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const TopicPage = () => {
  const { isTeacher } = useAuthenticated();
  const { page, setPage } = usePagination();
  const { faculties } = useFaculty({
    initialGet: true,
  });
  const { majors } = useMajor({
    initialGet: true,
  });
  const {
    topics,
    isTopicLoading,
    createTopic,
    updateTopic,
    refreshTopic,
    deleteTopic,
    isModifiedTopicLoading,
  } = useTopic();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteTopic(id);
      handleGetTopic();

      return true;
    },
  });

  const facultyOptionList = useMemo(
    () =>
      faculties?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [faculties?.results]
  );
  const majorOptionList = useMemo(
    () =>
      majors?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [majors?.results]
  );

  const columnData = useMemo(
    () => [
      {
        columnId: "no",
        label: "STT",
        render: (_, data, index) => index + 1,
      },
      {
        columnId: "code",
        label: "Mã đề tài",
      },
      {
        columnId: "name",
        label: "Tên đề tài",
      },
      {
        columnId: "major",
        label: "Tên ngành học",
        render: (data) => data?.name,
      },
      {
        columnId: "faculty",
        label: "Khoa",
        render: (data) => data?.name,
      },
      {
        hide: !isTeacher,
        columnId: "action",
        label: "Thao tác",
      },
    ],
    [isTeacher]
  );
  const formLayoutData = [
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên đề tài",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã đề tài",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "facultyId",
      options: facultyOptionList,
      properties: {
        label: "Khoa",
        placeholder: "Chọn khoa",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "majorId",
      options: majorOptionList,
      properties: {
        label: "Ngành",
        placeholder: "Chọn ngành",
        minWidthLabel: "150px",
      },
    },
    {
      type: "textarea",
      name: "requirement",
      properties: {
        label: "Yêu cầu",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetTopic = useCallback(
    (keyword) => {
      refreshTopic({
        page,
        keyword,
      });
    },
    [page, refreshTopic]
  );

  const handleModifiedTopic = useCallback(
    async (values) => {
      if (values?.id) {
        await updateTopic(values?.id, values);
      } else {
        await createTopic(values);
      }

      handleGetTopic();

      return true;
    },
    [createTopic, handleGetTopic, updateTopic]
  );

  useEffect(() => {
    handleGetTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên đề tài, mã đề tài"
            onCreate={() =>
              open({
                title: "Thêm mới đề tài",
              })
            }
            onSearch={(keyword) => handleGetTopic(keyword)}
            hideCreateBtn={!isTeacher}
          />
        </Box>
        <Table
          loading={isTopicLoading}
          columnData={columnData}
          tableData={topics?.results}
          totalPage={topics?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa đề tài",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá đề tài",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedTopic}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedTopicValidation}
        isLoading={isModifiedTopicLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá đề tài này không?"
        isLoading={isModifiedTopicLoading}
      />
    </>
  );
};

export default TopicPage;
