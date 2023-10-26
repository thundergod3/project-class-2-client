import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedReportThesisValidation } from "./constants";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";
import useReportThesis from "hooks/useReportThesis";
import FileName from "components/common/FileName";

const ReportThesisPage = () => {
  const { page, setPage } = usePagination();
  const {
    reportTheses,
    isReportThesisLoading,
    createReportThesis,
    updateReportThesis,
    deleteReportThesis,
    refreshReportThesis,
    isModifiedReportThesisLoading,
  } = useReportThesis();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteReportThesis(id);
      handleGetReportThesis();

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
      columnId: "name",
      label: "Tên đề tài",
      render: (value, data) => <FileName name={value} link={data?.file} />,
    },
    {
      columnId: "user",
      label: "Mã đề tài",
      render: (data) => data?.code,
    },
    {
      columnId: "user",
      label: "Tên ngành học",
      render: (data) => data?.faculty?.name,
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
        label: "Tên biên bản",
        minWidthLabel: "120px",
      },
    },
    {
      type: "input",
      name: "userCode",
      properties: {
        label: "Mã sinh viên",
        minWidthLabel: "120px",
      },
    },
    {
      type: "upload",
      name: "file",
      properties: {
        label: "File tài liệu",
        minWidthLabel: "120px",
      },
    },
  ];

  const handleGetReportThesis = useCallback(
    (keyword) => {
      refreshReportThesis({
        page,
        keyword,
      });
    },
    [page, refreshReportThesis]
  );

  const handleModifiedTopic = useCallback(
    async (values) => {
      if (values?.id) {
        await updateReportThesis(values?.id, values);
      } else {
        await createReportThesis(values);
      }

      handleGetReportThesis();

      return true;
    },
    [createReportThesis, handleGetReportThesis, updateReportThesis]
  );

  useEffect(() => {
    handleGetReportThesis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên tên đề tài, mã đề tài"
            onCreate={() =>
              open({
                title: "Thêm mới biên bản",
              })
            }
            onSearch={(keyword) => handleGetReportThesis(keyword)}
          />
        </Box>
        <Table
          loading={isReportThesisLoading}
          columnData={columnData}
          tableData={reportTheses?.results}
          totalPage={reportTheses?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa biên bản",
              data: {
                ...data,
                userCode: data?.user?.code,
              },
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá biên bản",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedTopic}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedReportThesisValidation}
        isLoading={isModifiedReportThesisLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá đề tài này không?"
        isLoading={isModifiedReportThesisLoading}
      />
    </>
  );
};

export default ReportThesisPage;
