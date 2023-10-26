import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedOutlineValidation } from "./constants";
import useOutline from "hooks/useOutline";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";
import FileName from "components/common/FileName";

const OutlinePage = () => {
  const { page, setPage } = usePagination();
  const {
    outlines,
    isOutlineLoading,
    createOutline,
    updateOutline,
    refreshOutline,
    deleteOutline,
    isModifiedOutlineLoading,
  } = useOutline();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteOutline(id);
      handleGetOutline();

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
      label: "Mã đề cương",
    },
    {
      columnId: "name",
      label: "Tên đề cương",
      render: (value, data) => <FileName name={value} link={data?.file} />,
    },
    {
      columnId: "action",
      label: "Thao tác",
    },
  ];
  const formLayoutData = [
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên đề cương",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã đề cương",
        minWidthLabel: "150px",
      },
    },
    {
      type: "upload",
      name: "file",
      properties: {
        label: "File tài liệu",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetOutline = useCallback(
    (keyword) => {
      refreshOutline({
        page,
        keyword,
      });
    },
    [page, refreshOutline]
  );

  const handleModifiedOutline = useCallback(
    async (values) => {
      if (values?.id) {
        await updateOutline(values?.id, values);
      } else {
        await createOutline(values);
      }

      handleGetOutline();

      return true;
    },
    [createOutline, handleGetOutline, updateOutline]
  );

  useEffect(() => {
    handleGetOutline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên tên đề cương, mã đề cương"
            onCreate={() =>
              open({
                title: "Thêm mới đề cương",
              })
            }
            onSearch={(keyword) => handleGetOutline(keyword)}
          />
        </Box>
        <Table
          loading={isOutlineLoading}
          columnData={columnData}
          tableData={outlines?.results}
          totalPage={outlines?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa đề cương",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá đề cương",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedOutline}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedOutlineValidation}
        isLoading={isModifiedOutlineLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá đề cương này không?"
        isLoading={isModifiedOutlineLoading}
      />
    </>
  );
};

export default OutlinePage;
