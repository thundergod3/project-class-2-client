import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedFacultyValidation } from "./constants";
import useFaculty from "hooks/useFaculty";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const FacultyPage = () => {
  const { page, setPage } = usePagination();
  const {
    faculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    isFacultyLoading,
    isModifiedFacultyLoading,
    refreshFaculty,
  } = useFaculty();
  const { open, close, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteFaculty(id);
      refreshFaculty();
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
      label: "Mã khoa",
    },
    {
      columnId: "name",
      label: "Tên khoa",
    },
    {
      columnId: "action",
      label: "Thao tác",
    },
  ];
  const formLayoutData = [
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã khoa",
        minWidthLabel: "80px",
      },
    },
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên khoa",
        minWidthLabel: "80px",
      },
    },
  ];

  const handleGetFaculty = useCallback(() => {
    refreshFaculty({
      page,
    });
  }, [page, refreshFaculty]);

  const handleModifiedFaculty = useCallback(
    async (values) => {
      if (values?.id) {
        await updateFaculty(values?.id, values);
      } else {
        await createFaculty(values);
      }

      handleGetFaculty();
    },
    [createFaculty, handleGetFaculty, updateFaculty]
  );

  useEffect(() => {
    handleGetFaculty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên khoa, mã khoa"
            onCreate={() =>
              open({
                title: "Thêm mới Khoa",
              })
            }
            onSearch={(keyword) =>
              refreshFaculty({
                page,
                keyword,
              })
            }
          />
        </Box>
        <Table
          loading={isFacultyLoading}
          totalPage={faculties?.total}
          columnData={columnData}
          tableData={faculties?.results}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa Khoa",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá Khoa",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onClose={close}
        onSave={handleModifiedFaculty}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedFacultyValidation}
        isLoading={isModifiedFacultyLoading}
      />
      <DialogRemove description="Bạn có chắc chắn muốn xoá Khoa này không?" />
    </>
  );
};

export default FacultyPage;
