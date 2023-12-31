import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedTeacherValidation } from "./constants";
import useFaculty from "hooks/useFaculty";
import useMajor from "hooks/useMajor";
import useTeacher from "hooks/useTeacher";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const TeacherPage = () => {
  const { page, setPage } = usePagination();
  const { faculties } = useFaculty({
    initialGet: true,
  });
  const { majors } = useMajor({
    initialGet: true,
  });
  const {
    teachers,
    isTeacherLoading,
    createTeacher,
    updateTeacher,
    refreshTeacher,
    deleteTeacher,
    isModifiedTeacherLoading,
  } = useTeacher();
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteTeacher(id);
      setPage(0);
      handleGetTeacher();
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
      label: "Mã giáo viên",
    },
    {
      columnId: "name",
      label: "Tên giáo viên",
    },
    {
      columnId: "major",
      label: "Ngành học",
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
        label: "Tên giáo viên",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã giáo viên",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "facultyId",
      options: facultyOptionList,
      properties: {
        label: "Khoa",
        minWidthLabel: "150px",
        placeholder: "Chọn khoa",
      },
    },
    {
      type: "dropdown",
      name: "majorId",
      options: majorOptionList,
      properties: {
        label: "Ngành",
        minWidthLabel: "150px",
        placeholder: "Chọn ngành",
      },
    },
  ];

  const handleGetTeacher = useCallback(
    (keyword) => {
      refreshTeacher({
        page,
        keyword,
      });
    },
    [page, refreshTeacher]
  );

  const handleModifiedTeacher = useCallback(
    async (values) => {
      if (values?.id) {
        await updateTeacher(values?.id, values);
      } else {
        await createTeacher(values);
      }

      handleGetTeacher();

      return true;
    },
    [createTeacher, handleGetTeacher, updateTeacher]
  );

  useEffect(() => {
    handleGetTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên giáo viên, mã giáo viên"
            onCreate={() =>
              open({
                title: "Thêm mới Giáo viên",
              })
            }
            onSearch={(keyword) => handleGetTeacher(keyword)}
          />
        </Box>
        <Table
          loading={isTeacherLoading}
          columnData={columnData}
          tableData={teachers?.results}
          totalPage={teachers?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa Giáo viên",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá Giáo viên",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedTeacher}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedTeacherValidation}
        isLoading={isModifiedTeacherLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá Giáo viên này không?"
        isLoading={isModifiedTeacherLoading}
      />
    </>
  );
};

export default TeacherPage;
