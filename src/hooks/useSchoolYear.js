import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import schoolYearsService from "services/SchoolYearsService";

const useSchoolYear = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetSchoolYear = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await schoolYearsService.getSchoolYearList(
          QueryString.stringify(filter)
        );

        setData(data);
        setLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setLoading(false);
      }
    },
    [openNotificationError]
  );

  const createSchoolYear = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await schoolYearsService.createSchoolYear(body);

        openNotificationSuccess("Thêm mới Năm học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateSchoolYear = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await schoolYearsService.updateSchoolYear(id, body);

        openNotificationSuccess("Chỉnh sửa Năm học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteSchoolYear = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await schoolYearsService.deleteSchoolYear(id);

        openNotificationSuccess("Xoá Năm học thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetSchoolYear({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    schoolYears: data,
    isSchoolYearLoading: loading,
    isModifiedSchoolYearLoading: isModifiedLoading,
    refreshSchoolYear: handleGetSchoolYear,
    createSchoolYear,
    updateSchoolYear,
    deleteSchoolYear,
  };
};

export default useSchoolYear;
