import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedTopicValidation } from "./constants";
import useMajor from "hooks/useMajor";
import useTopic from "hooks/useTopic";
import useAuthenticated from "hooks/useAuthenticated";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const ProposalTopicPage = () => {
  const { userData, isStudent } = useAuthenticated();
  const { page, setPage } = usePagination();
  const { majors } = useMajor({
    initialGet: true,
  });
  const {
    topics,
    isTopicLoading,
    proposalTopic,
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
      handleGetProposalTopic();

      return true;
    },
  });

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
        columnId: "name",
        label: "Tên đề tài",
      },
      {
        columnId: "major",
        label: "Mã ngành",
        render: (data) => data?.code,
      },
      {
        hide: !isStudent,
        columnId: "action",
        label: "Thao tác",
      },
    ],
    [isStudent]
  );
  const formLayoutData = [
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã đề tài",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên đề tài",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "majorId",
      options: majorOptionList,
      properties: {
        label: "Ngành",
        minWidthLabel: "150px",
        placeholder: "Chọn ngành",
      },
    },
    {
      type: "textarea",
      name: "reason",
      properties: {
        label: "Lý do",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetProposalTopic = useCallback(
    (keyword) => {
      refreshTopic({
        page,
        status: "draft",
        userId: isStudent ? userData?.id : undefined,
        keyword,
      });
    },
    [isStudent, page, refreshTopic, userData?.id]
  );

  const handleModifiedTopic = useCallback(
    async (values) => {
      if (values?.id) {
        await updateTopic(values?.id, values);
      } else {
        const result = await proposalTopic(values);

        if (!result) {
          return result;
        }
      }

      handleGetProposalTopic();

      return true;
    },
    [proposalTopic, handleGetProposalTopic, updateTopic]
  );

  useEffect(() => {
    handleGetProposalTopic();
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
                title: "Đề xuất đề tài",
              })
            }
            onSearch={(keyword) => handleGetProposalTopic(keyword)}
            hideCreateBtn={!isStudent}
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
      <DialogRemove description="Bạn có chắc chắn muốn xoá đề tài này không?" />
    </>
  );
};

export default ProposalTopicPage;
