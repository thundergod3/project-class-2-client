import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedMajorValidation } from "./constants";
import useMajor from "hooks/useMajor";
import useFaculty from "hooks/useFaculty";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const MajorPage = () => {
  const { page, setPage } = usePagination();
  const { faculties } = useFaculty({
    initialGet: true,
  });
  const {
    majors,
    isMajorLoading,
    createMajor,
    updateMajor,
    deleteMajor,
    isModifiedMajorLoading,
    refreshMajor,
  } = useMajor();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteMajor(id);
      handleGetMajor();

      return true;
    },
  });

  const facultyOptionList = useMemo(
    () =>
      faculties?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [faculties?.results]
  );

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "code",
      label: "Mã ngành",
    },
    {
      columnId: "name",
      label: "Tên ngành học",
    },
    {
      columnId: "faculty",
      label: "Khoa",
      render: (data) => data?.name,
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
        label: "Mã Ngành học",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên Ngành học",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "facultyId",
      options: facultyOptionList,
      properties: {
        label: "Khoa",
        placeholder: "Chọn khoa",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetMajor = useCallback(
    (keyword) => {
      refreshMajor({
        page,
        keyword,
      });
    },
    [page, refreshMajor]
  );

  const handleModifiedMajor = useCallback(
    async (values) => {
      if (values?.id) {
        await updateMajor(values?.id, values);
      } else {
        await createMajor(values);
      }

      handleGetMajor();

      return true;
    },
    [createMajor, handleGetMajor, updateMajor]
  );

  useEffect(() => {
    handleGetMajor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên ngành học, mã ngành học"
            onCreate={() =>
              open({
                title: "Thêm mới Ngành học",
              })
            }
            onSearch={(keyword) => handleGetMajor(keyword)}
          />
        </Box>
        <Table
          loading={isMajorLoading}
          totalPage={majors?.total}
          columnData={columnData}
          tableData={majors?.results}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa Ngành học",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá Ngành",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedMajor}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedMajorValidation}
        isLoading={isModifiedMajorLoading}
      />
      <DialogRemove description="Bạn có chắc chắn muốn xoá Ngành này không?" />
    </>
  );
};

export default MajorPage;
