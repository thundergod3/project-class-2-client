import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedDocumentValidation } from "./constants";
import useDocument from "hooks/useDocument";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const DocumentPage = () => {
  const { page, setPage } = usePagination();
  const {
    documents,
    isDocumentLoading,
    createDocument,
    updateDocument,
    refreshDocument,
    deleteDocument,
    isModifiedDocumentLoading,
  } = useDocument();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteDocument(id);
      handleGetDocument();

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
      label: "Mã tài liệu",
    },
    {
      columnId: "name",
      label: "Tên tài liệu",
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
        label: "Tên tài liệu",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã tài liệu",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetDocument = useCallback(
    (keyword) => {
      refreshDocument({
        page,
        keyword,
      });
    },
    [page, refreshDocument]
  );

  const handleModifiedDocument = useCallback(
    async (values) => {
      if (values?.id) {
        await updateDocument(values?.id, values);
      } else {
        await createDocument(values);
      }

      handleGetDocument();

      return true;
    },
    [createDocument, handleGetDocument, updateDocument]
  );

  useEffect(() => {
    handleGetDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên tên tài liệu, mã tài liệu"
            onCreate={() =>
              open({
                title: "Thêm mới tài liệu",
              })
            }
            onSearch={(keyword) => handleGetDocument(keyword)}
          />
        </Box>
        <Table
          loading={isDocumentLoading}
          columnData={columnData}
          tableData={documents?.results}
          totalPage={documents?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa tài liệu",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá tài liệu",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedDocument}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedDocumentValidation}
        isLoading={isModifiedDocumentLoading}
      />
      <DialogRemove description="Bạn có chắc chắn muốn xoá tài liệu này không?" />
    </>
  );
};

export default DocumentPage;
