import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedThesisValidation, resultsList } from "./constants";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import useThesis from "hooks/useThesis";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const ResultThesisPage = () => {
  const { page, setPage } = usePagination();
  const {
    theses,
    isThesisLoading,
    isModifiedThesisLoading,
    refreshThesis,
    updateThesis,
    createFinishThesis,
    deleteThesis,
  } = useThesis();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (values) => {
      await deleteThesis(values?.id, values?.userId);
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
      label: "Ngành",
      render: (data) => data?.faculty?.name,
    },
    {
      columnId: "result",
      label: "Kết quả",
      render: (data) =>
        resultsList?.find((record) => record?.value === data)?.label,
    },
    {
      columnId: "action",
      label: "Thao tác",
    },
  ];
  const formLayoutData = [
    {
      type: "input",
      name: "userCode",
      properties: {
        label: "Mã sinh viên",
        minWidthLabel: "120px",
      },
    },
    {
      type: "dropdown",
      name: "result",
      options: resultsList,
      properties: {
        label: "Kết quả",
        minWidthLabel: "120px",
        placeholder: "Chọn kết quả",
      },
    },
    {
      type: "input",
      name: "score",
      properties: {
        type: "number",
        label: "Điểm",
        minWidthLabel: "120px",
      },
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
      if (values?.id) {
        await updateThesis(values?.id, values);
      } else {
        await createFinishThesis(values);
      }

      handleGetThesis();

      return true;
    },
    [createFinishThesis, handleGetThesis, updateThesis]
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
            placeholder="Tìm kiếm theo mã sinh viên"
            onCreate={() =>
              open({
                title: "Thêm mới kết quả KLTN",
              })
            }
            onSearch={(keyword) => handleGetThesis(keyword)}
          />
        </Box>
        <Table
          loading={isThesisLoading}
          columnData={columnData}
          tableData={theses?.results}
          totalPage={theses?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa kết quả KLTN",
              data: {
                ...data,
                userCode: data?.user?.code,
              },
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá kết quả bảo vệ KLTN",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedThesis}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedThesisValidation}
        isLoading={isModifiedThesisLoading}
      />
      <DialogRemove description="Bạn có chắc chắn muốn xoá kết quả bảo vệ KLTN này?" />
    </>
  );
};

export default ResultThesisPage;
