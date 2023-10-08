import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import reportThesesService from "services/ReportThesesService";

const useReportThesis = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetReportThesis = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await reportThesesService.getReportThesisList(
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

  const createReportThesis = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await reportThesesService.createReportThesis(body);

        openNotificationSuccess("Thêm mới biên bản KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateReportThesis = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await reportThesesService.updateReportThesis(id, body);

        openNotificationSuccess("Chỉnh sửa biên bản KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteReportThesis = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await reportThesesService.deleteReportThesis(id);

        openNotificationSuccess("Xoá biên bản KLTN thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetReportThesis({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    reportTheses: data,
    isReportThesisLoading: loading,
    isModifiedReportThesisLoading: isModifiedLoading,
    refreshReportThesis: handleGetReportThesis,
    createReportThesis,
    updateReportThesis,
    deleteReportThesis,
  };
};

export default useReportThesis;
