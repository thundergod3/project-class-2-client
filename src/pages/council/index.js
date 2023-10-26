import { Box, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import dayjs from "dayjs";

import usePagination from "hooks/usePagination";
import useModal from "hooks/useModal";
import { modifiedMajorValidation } from "./constants";
import useThesis from "hooks/useThesis";
import useTeacher from "hooks/useTeacher";

import TableFilter from "components/common/TableFilter";
import Table from "components/common/Table";
import ModifiedFormModal from "components/common/ModifiedFormModal";
import ConfirmationModal from "components/common/ConfirmationModal";

const CouncilPage = () => {
  const { page, setPage } = usePagination();
  const {
    theses,
    isThesisLoading,
    refreshThesis,
    updateCouncil,
    isModifiedThesisLoading,
  } = useThesis();
  const { teachers } = useTeacher({
    initialGet: true,
  });
  const { open, Dialog } = useModal({
    modalBody: ModifiedFormModal,
    usingFooter: false,
  });
  const { open: openRemove, Dialog: DialogRemove } = useModal({
    modalBody: ConfirmationModal,
    handleSave: async (id) => {
      await updateCouncil(id, {
        council: undefined,
      });
      handleGetThesis();

      return true;
    },
  });

  const teacherOptionList = useMemo(
    () =>
      teachers?.results?.map((record) => ({
        value: record?.id,
        label: record?.name,
      })),
    [teachers?.results]
  );

  const columnData = [
    {
      columnId: "no",
      label: "STT",
      render: (_, data, index) => index + 1,
    },
    {
      columnId: "council",
      label: "Tên hội đồng",
      render: (data) => data?.name,
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
      columnId: "action",
      label: "Thao tác",
    },
  ];
  const formLayoutData = [
    {
      type: "input",
      name: "name",
      properties: {
        label: "Tên hội đồng",
        minWidthLabel: "120px",
      },
    },
    {
      type: "input",
      name: "userCode",
      properties: {
        label: "Mã sinh viên",
        minWidthLabel: "120px",
        readOnly: true,
      },
    },
    {
      type: "input",
      name: "topicCode",
      properties: {
        label: "Mã đề tài",
        minWidthLabel: "120px",
        readOnly: true,
      },
    },
    {
      type: "dropdown",
      name: "members",
      options: teacherOptionList,
      properties: {
        label: "Thành viên",
        placeholder: "Chọn thành viên",
        minWidthLabel: "120px",
        isMulti: true,
      },
    },
    {
      type: "datePicker",
      name: "time",
      properties: {
        label: "Thời gian",
        minWidthLabel: "120px",
      },
    },
    {
      type: "input",
      name: "location",
      properties: {
        label: "Địa điểm",
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
      await updateCouncil(values?.id, {
        council: {
          name: values?.name,
          members: values?.members,
          time: new Date(values?.time).toISOString(),
          location: values?.location,
        },
      });

      handleGetThesis();

      return true;
    },
    [handleGetThesis, updateCouncil]
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
            placeholder="Tìm kiếm theo tên đề tài, mã đề tài"
            onSearch={(keyword) => handleGetThesis(keyword)}
            hideCreateBtn
          />
        </Box>
        <Table
          loading={isThesisLoading}
          totalPage={theses?.total}
          columnData={columnData}
          tableData={theses?.results}
          page={page}
          setPage={setPage}
          onEdit={(data) =>
            open({
              title: "Chỉnh sửa hội đồng bảo vệ",
              data: {
                id: data?.id,
                name: data?.council?.name,
                userCode: data?.user?.code,
                topicCode: data?.user?.topic?.code,
                members: data?.council?.members,
                time: dayjs(data?.council?.time),
                location: data?.council?.location,
              },
            })
          }
          onRemove={(id) =>
            openRemove({
              title: "Xác nhận xoá hội đồng bảo vệ",
              data: id,
            })
          }
        />
      </Stack>
      <Dialog
        onSave={handleModifiedThesis}
        formLayoutData={formLayoutData}
        formValidationSchema={modifiedMajorValidation}
        isLoading={isModifiedThesisLoading}
      />
      <DialogRemove
        description="Bạn có chắc chắn muốn xoá hội đồng này không?"
        isLoading={isModifiedThesisLoading}
      />
    </>
  );
};

export default CouncilPage;
