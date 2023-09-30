import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedStudentValidation } from "./constants";
import useFaculty from "hooks/useFaculty";
import useMajor from "hooks/useMajor";
import useStudent from "hooks/useStudent";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const StudentPage = () => {
  const { page, setPage } = usePagination();
  const { faculties } = useFaculty({
    initialGet: true,
  });
  const { majors } = useMajor({
    initialGet: true,
  });
  const {
    students,
    isStudentLoading,
    createStudent,
    updateStudent,
    refreshStudent,
    deleteTeacher,
    isModifiedStudentLoading,
  } = useStudent();
  const { open, close, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteTeacher(id);
      refreshStudent();
    },
  });

  const facultyOptionList = useMemo(
    () =>
      faculties?.results?.map((record) => ({
        value: record?.id,
        label: record?.code,
      })),
    [faculties?.results]
  );
  const majorOptionList = useMemo(
    () =>
      majors?.results?.map((record) => ({
        value: record?.id,
        label: record?.code,
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
      label: "Mã sinh viên",
    },
    {
      columnId: "name",
      label: "Tên sinh viên",
    },
    {
      columnId: "major",
      label: "Tên ngành học",
      render: (data) => data?.code,
    },
    {
      columnId: "faculty",
      label: "Khoa",
      render: (data) => data?.code,
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
        label: "Tên sinh viên",
        minWidthLabel: "150px",
      },
    },
    {
      type: "input",
      name: "code",
      properties: {
        label: "Mã sinh viên",
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
      },
    },
    {
      type: "dropdown",
      name: "majorId",
      options: majorOptionList,
      properties: {
        label: "Ngành",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetStudent = useCallback(() => {
    refreshStudent({
      page,
    });
  }, [page, refreshStudent]);

  const handleModifiedStudent = useCallback(
    async (values) => {
      if (values?.id) {
        await updateStudent(values?.id, values);
      } else {
        await createStudent(values);
      }

      handleGetStudent();
    },
    [createStudent, handleGetStudent, updateStudent]
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
            placeholder="Tìm kiếm theo tên tên sinh viên, mã sinh viên"
            onCreate={() =>
              open({
                title: "Thêm mới sinh viên",
              })
            }
            onSearch={(keyword) =>
              refreshStudent({
                page,
                keyword,
              })
            }
          />
        </Box>
        <Table
          loading={isStudentLoading}
          columnData={columnData}
          tableData={students?.results}
          totalPage={students?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa sinh viên",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá sinh viên",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onClose={close}
        onSave={handleModifiedStudent}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedStudentValidation}
        isLoading={isModifiedStudentLoading}
      />
      <DialogRemove description="Bạn có chắc chắn muốn xoá sinh viên này không?" />
    </>
  );
};

export default StudentPage;
