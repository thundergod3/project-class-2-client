import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedSchoolYearValidation } from "./constants";
import useSchoolYear from "hooks/useSchoolYear";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const SchoolYearPage = () => {
  const { page, setPage } = usePagination();
  const {
    schoolYears,
    isSchoolYearLoading,
    createSchoolYear,
    updateSchoolYear,
    refreshSchoolYear,
    deleteSchoolYear,
    isModifiedSchoolYearLoading,
  } = useSchoolYear();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteSchoolYear(id);
      setPage(0);
      handleGetSchoolYear();
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
      label: "Mã năm học",
    },
    {
      columnId: "name",
      label: "Tên năm học",
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
        label: "Tên năm học",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã năm học",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetSchoolYear = useCallback(
    (keyword) => {
      refreshSchoolYear({
        page,
        keyword,
      });
    },
    [page, refreshSchoolYear]
  );

  const handleModifiedSchoolYear = useCallback(
    async (values) => {
      if (values?.id) {
        await updateSchoolYear(values?.id, values);
      } else {
        await createSchoolYear(values);
      }

      handleGetSchoolYear();

      return true;
    },
    [createSchoolYear, handleGetSchoolYear, updateSchoolYear]
  );

  useEffect(() => {
    handleGetSchoolYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên năm học, mã năm học"
            onCreate={() =>
              open({
                title: "Thêm mới năm học",
              })
            }
            onSearch={(keyword) => handleGetSchoolYear(keyword)}
          />
        </Box>
        <Table
          loading={isSchoolYearLoading}
          columnData={columnData}
          tableData={schoolYears?.results}
          totalPage={schoolYears?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa năm học",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá năm học",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedSchoolYear}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedSchoolYearValidation}
        isLoading={isModifiedSchoolYearLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá năm học này không?"
        isLoading={isModifiedSchoolYearLoading}
      />
    </>
  );
};

export default SchoolYearPage;
