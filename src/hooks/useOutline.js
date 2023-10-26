import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import outlinesService from "services/OutlinesService";

const useOutline = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetOutline = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await outlinesService.getOutlineList(
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

  const createOutline = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await outlinesService.createOutline(body);

        openNotificationSuccess("Thêm mới Sinh viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateOutline = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await outlinesService.updateOutline(id, body);

        openNotificationSuccess("Chỉnh sửa Sinh viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteOutline = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await outlinesService.deleteOutline(id);

        openNotificationSuccess("Xoá Sinh viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetOutline({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    outlines: data,
    isOutlineLoading: loading,
    isModifiedOutlineLoading: isModifiedLoading,
    refreshOutline: handleGetOutline,
    createOutline,
    updateOutline,
    deleteOutline,
  };
};

export default useOutline;
