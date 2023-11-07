import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import dayjs from "dayjs";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import DetailModal from "components/common/DetailModal";
import useThesis from "hooks/useThesis";
import ReasonModal from "components/common/ReasonModal";

const ThesisPage = () => {
  const { page, setPage } = usePagination();
  const {
    theses,
    isThesisLoading,
    refreshThesis,
    approveThesis,
    deleteThesis,
    isModifiedThesisLoading,
  } = useThesis();
  const { open, Dialog } = useModal({
    modalBody: DetailModal,
    usingFooter: false,
  });
  const { open: openReason, Dialog: DialogReason } = useModal({
    modalBody: ReasonModal,
    handleSave: async (data) => {
      await handleUnApproveThesis(data);
      handleGetThesis();

      return true;
    },
  });

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "user",
      label: "Mã sinh viên",
      render: (data) => data?.code,
    },
    {
      columnId: "user",
      label: "Tên đề tài",
      render: (data) => data?.topic?.name,
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
            open({
              title: "Thông tin bảo vệ KLTN",
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
      value: "user",
      label: "Họ và tên",
      customValue: (data) => data?.fullName,
    },
    {
      value: "user",
      label: "Mã sinh viên",
      customValue: (data) => data?.code,
    },
    {
      value: "user",
      label: "Ngày sinh",
      customValue: (data) => dayjs(data?.dob).format("DD/MM/YYYY"),
    },
    {
      value: "user",
      label: "Mã ngành học",
      customValue: (data) => data?.faculty?.code,
    },
  ];

  const handleGetThesis = useCallback(
    (keyword) => {
      refreshThesis({
        page,
        keyword,
      });
    },
    [page, refreshThesis]
  );

  const handelApproveThesis = useCallback(
    async (values) => {
      await approveThesis(values?.id, {
        userId: values?.userId,
      });

      handleGetThesis();

      return true;
    },
    [approveThesis, handleGetThesis]
  );

  const handleUnApproveThesis = useCallback(
    async (values) => {
      await deleteThesis(values?.id, {
        userId: values?.userId,
      });

      handleGetThesis();

      return true;
    },
    [deleteThesis, handleGetThesis]
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
            placeholder="Tìm kiếm theo tên đề tài, mã sinh viên"
            onSearch={(keyword) => handleGetThesis(keyword)}
            hideCreateBtn
          />
        </Box>
        <Table
          loading={isThesisLoading}
          columnData={columnData}
          tableData={theses?.results}
          totalPage={theses?.total}
          page={page}
          setPage={setPage}
        />
      </Stack>
      <Dialog
        detailList={detailList}
        onSave={handelApproveThesis}
        onClose={(data) =>
          openReason({
            title: "Lý do",
            data,
          })
        }
        closeBtnText="Không phê duyệt"
        saveBtnText="Phê duyệt"
      />
      <DialogReason isLoading={isModifiedThesisLoading} />
    </>
  );
};

export default ThesisPage;
