import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import facultiesService from "services/FacultiesService";
import QueryString from "utils/queryString";

const useFaculty = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetFaculty = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await facultiesService.getFacultyList(
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

  const createFaculty = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await facultiesService.createFaculty(body);

        openNotificationSuccess("Thêm mới Khoa thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateFaculty = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await facultiesService.updateFaculty(id, body);

        openNotificationSuccess("Chỉnh sửa Khoa thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteFaculty = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await facultiesService.deleteFaculty(id);

        openNotificationSuccess("Xoá Khoa thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetFaculty({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    faculties: data,
    isFacultyLoading: loading,
    isModifiedFacultyLoading: isModifiedLoading,
    refreshFaculty: handleGetFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty,
  };
};

export default useFaculty;
