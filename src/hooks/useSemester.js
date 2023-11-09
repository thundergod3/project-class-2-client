import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import semestersService from "services/SemestersService";

const useSemester = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetSemester = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await semestersService.getSemesterList(
          QueryString.stringify(filter)
        );

        setData(data);
        setLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setLoading(false);
      }
    },
    [openNotificationError]
  );

  const createSemester = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await semestersService.createSemester(body);

        openNotificationSuccess("Thêm mới Kì học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateSemester = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await semestersService.updateSemester(id, body);

        openNotificationSuccess("Chỉnh sửa Kì học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteSemester = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await semestersService.deleteSemester(id);

        openNotificationSuccess("Xoá Kì học thành công");
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetSemester({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    semesters: data,
    isSemesterYearLoading: loading,
    isModifiedSemesterLoading: isModifiedLoading,
    refreshSemester: handleGetSemester,
    createSemester,
    updateSemester,
    deleteSemester,
  };
};

export default useSemester;
