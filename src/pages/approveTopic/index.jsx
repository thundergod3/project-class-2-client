import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import useTopic from "hooks/useTopic";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import DetailModal from "components/common/DetailModal";

const ApproveTopicPage = () => {
  const { page, setPage } = usePagination();
  const { topics, isTopicLoading, refreshTopic, approveTopic, unApproveTopic } =
    useTopic();
  const { open, Dialog } = useModal({
    modalBody: DetailModal,
    usingFooter: false,
  });

  const columnData = [
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
      columnId: "action",
      label: "Thao tác",
      render: (_, data) => (
        <Text
          textAlign="center"
          color="text.secondary"
          textDecoration="underline"
          cursor="pointer"
          onClick={() =>
            open({
              title: "Thông tin chi tiết đề tài",
              data,
            })
          }>
          Xem
        </Text>
      ),
    },
  ];
  const detailList = [
    {
      value: "code",
      label: "Mã đề tài",
    },
    {
      value: "name",
      label: "Tên đề tài",
    },
    {
      value: "major",
      label: "Ngành",
      customValue: (data) => data?.name,
    },
    {
      isBorder: true,
      value: "reason",
      label: "Lý do",
    },
  ];

  const handleGetProposalTopic = useCallback(() => {
    refreshTopic({
      page,
      status: "draft",
    });
  }, [page, refreshTopic]);

  const handelApproveTopic = useCallback(
    async (values) => {
      await approveTopic(values?.id);

      handleGetProposalTopic();
    },
    [approveTopic, handleGetProposalTopic]
  );

  const handleUnApproveTopic = useCallback(
    async (values) => {
      await unApproveTopic(values?.id);

      handleGetProposalTopic();
    },
    [handleGetProposalTopic, unApproveTopic]
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
            onSearch={(keyword) =>
              refreshTopic({
                page,
                status: "draft",
                keyword,
              })
            }
            hideCreateBtn
          />
        </Box>
        <Table
          loading={isTopicLoading}
          columnData={columnData}
          tableData={topics?.results}
          totalPage={topics?.total}
          page={page}
          setPage={setPage}
        />
      </Stack>
      <Dialog
        detailList={detailList}
        onSave={handelApproveTopic}
        onClose={handleUnApproveTopic}
        closeBtnText="Không phê duyệt"
        saveBtnText="Phê duyệt"
      />
    </>
  );
};

export default ApproveTopicPage;
