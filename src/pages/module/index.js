import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedModuleValidation } from "./constants";
import useFaculty from "hooks/useFaculty";
import useMajor from "hooks/useMajor";
import useModule from "hooks/useModule";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const ModulePage = () => {
  const { page, setPage } = usePagination();
  const { faculties } = useFaculty({
    initialGet: true,
  });
  const { majors } = useMajor({
    initialGet: true,
  });
  const {
    modules,
    isModuleLoading,
    createModule,
    updateModule,
    deleteModule,
    refreshModule,
    isModifiedModuleLoading,
  } = useModule();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteModule(id);
      handleGetModule();

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
  const majorOptionList = useMemo(
    () =>
      majors?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [majors?.results]
  );

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "code",
      label: "Mã học phần",
    },
    {
      columnId: "name",
      label: "Tên học phần",
    },
    {
      columnId: "major",
      label: "Ngành",
      render: (data) => data?.name,
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
      name: "name",
      properties: {
        label: "Tên học phần",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã học phần",
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
    {
      type: "dropdown",
      name: "majorId",
      options: majorOptionList,
      properties: {
        label: "Ngành",
        placeholder: "Chọn ngành",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetModule = useCallback(
    (keyword) => {
      refreshModule({
        page,
        keyword,
      });
    },
    [page, refreshModule]
  );

  const handleModifiedModule = useCallback(
    async (values) => {
      if (values?.id) {
        await updateModule(values?.id, values);
      } else {
        await createModule(values);
      }

      handleGetModule();

      return true;
    },
    [createModule, handleGetModule, updateModule]
  );

  useEffect(() => {
    handleGetModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên tên học phần, mã học phần"
            onCreate={() =>
              open({
                title: "Thêm mới học phần KLTN",
              })
            }
            onSearch={(keyword) => handleGetModule(keyword)}
          />
        </Box>
        <Table
          loading={isModuleLoading}
          columnData={columnData}
          tableData={modules?.results}
          totalPage={modules?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa học phần KLTN",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá Học phần",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedModule}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedModuleValidation}
        isLoading={isModifiedModuleLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá Học phần này không?"
        isLoading={isModifiedModuleLoading}
      />
    </>
  );
};

export default ModulePage;
