import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedSemesterValidation } from "./constants";
import useSemester from "hooks/useSemester";
import useSchoolYear from "hooks/useSchoolYear";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const SemesterPage = () => {
  const { page, setPage } = usePagination();
  const {
    semesters,
    isSemesterYearLoading,
    createSemester,
    updateSemester,
    refreshSemester,
    deleteSemester,
    isModifiedSemesterLoading,
  } = useSemester();
  const { schoolYears } = useSchoolYear({
    initialGet: true,
  });
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await deleteSemester(id);
      handleGetSemester();

      return true;
    },
  });

  const schoolYearOptionList = useMemo(
    () =>
      schoolYears?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [schoolYears?.results]
  );

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "name",
      label: "Kì học",
    },
    {
      columnId: "schoolYear",
      label: "Năm học",
      render: (value) => value?.name,
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
        label: "Tên kỳ học",
        minWidthLabel: "150px",
      },
    },
    {
      type: "dropdown",
      name: "schoolYearId",
      options: schoolYearOptionList,
      properties: {
        label: "Năm học",
        placeholder: "Chọn năm học",
        minWidthLabel: "150px",
      },
    },
  ];

  const handleGetSemester = useCallback(
    (keyword) => {
      refreshSemester({
        page,
        keyword,
      });
    },
    [page, refreshSemester]
  );

  const handleModifiedSemester = useCallback(
    async (values) => {
      if (values?.id) {
        await updateSemester(values?.id, values);
      } else {
        await createSemester(values);
      }

      handleGetSemester();

      return true;
    },
    [createSemester, handleGetSemester, updateSemester]
  );

  useEffect(() => {
    handleGetSemester();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Stack spacing="24px" paddingTop="16px">
        <Box padding="0px 24px">
          <TableFilter
            placeholder="Tìm kiếm theo tên kì học, mã kì học"
            onCreate={() =>
              open({
                title: "Thêm mới kì học",
              })
            }
            onSearch={(keyword) => handleGetSemester(keyword)}
          />
        </Box>
        <Table
          loading={isSemesterYearLoading}
          columnData={columnData}
          tableData={semesters?.results}
          totalPage={semesters?.total}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa kì học",
              data,
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá kì học",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedSemester}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedSemesterValidation}
        isLoading={isModifiedSemesterLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá kì học này không?"
        isLoading={isModifiedSemesterLoading}
      />
    </>
  );
};

export default SemesterPage;
