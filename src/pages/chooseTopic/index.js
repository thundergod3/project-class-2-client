import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import useTopic from "hooks/useTopic";
import useAuthenticated from "hooks/useAuthenticated";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ConfirmationModal from "components/common/ConfirmationModal";
import DetailModal from "components/common/DetailModal";

const ChooseTopicPage = () => {
  const { userData, getUserData } = useAuthenticated();
  const { page, setPage } = usePagination();
  const {
    topics,
    isTopicLoading,
    refreshTopic,
    registerTopic,
    unRegisterTopic,
  } = useTopic();
  const { open, Dialog } = useModal({
    modalBody: DetailModal,
    usingFooter: false,
  });
  const { open: openConfirmRegister, Dialog: DialogConfirmRegister } = useModal(
    {
      modalBody: ConfirmationModal,
      handleSave: async (id) => {
        await registerTopic(id);
        getUserData();
        refreshTopic();

        return true;
      },
    }
  );
  const { open: openConfirmUnRegister, Dialog: DialogConfirmUnRegister } =
    useModal({
      modalBody: ConfirmationModal,
      handleSave: async (id) => {
        await unRegisterTopic(id);
        getUserData();
        refreshTopic();

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
      render: (data) => data?.code,
    },
    {
      columnId: "action",
      label: "Thao tác",
      render: (_, data) => (
        <Stack direction="row" spacing={3} justifyContent="center">
          <Text
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
          {userData?.id === data?.registerId && (
            <Text
              color="text.secondary"
              textDecoration="underline"
              cursor="pointer"
              onClick={() =>
                openConfirmUnRegister({
                  title: "Xác nhận huỷ đăng ký đề tài KLTN",
                  data: data?.id,
                })
              }>
              Huỷ đăng ký
            </Text>
          )}
          {!userData?.topicId && !data?.registerId && (
            <Text
              color="text.secondary"
              textDecoration="underline"
              cursor="pointer"
              onClick={() =>
                openConfirmRegister({
                  title: "Xác nhận đăng ký đề tài KLTN",
                  data: data?.id,
                })
              }>
              Đăng ký
            </Text>
          )}
        </Stack>
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
      value: "user",
      label: "Giáo viên phụ trách",
      customValue: (data) => data?.name,
    },
    {
      isBorder: true,
      value: "requirement",
      label: "Yêu cầu",
    },
  ];

  const handleGetStudent = useCallback(
    (keyword) => {
      refreshTopic({
        page,
        keyword,
      });
    },
    [page, refreshTopic]
  );

  useEffect(() => {
    handleGetStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên đề tài, mã đề tài"
            onSearch={(keyword) => handleGetStudent(keyword)}
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
      <Dialog detailList={detailList} />
      <DialogConfirmRegister description="Bạn có chắc chắn muốn đăng ký đề tài KLTN này?" />
      <DialogConfirmUnRegister description="Bạn có chắc chắn muốn huỷ đăng ký đề tài KLTN này?" />
    </>
  );
};

export default ChooseTopicPage;
