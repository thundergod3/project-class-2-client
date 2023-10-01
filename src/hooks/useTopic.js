import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import topicsService from "services/TopicsService";

const useTopic = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetTopic = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await topicsService.getTopicList(
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

  const createTopic = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.createTopic(body);

        openNotificationSuccess("Thêm mới Đề tài hướng dẫn KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateTopic = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await topicsService.updateTopic(id, body);

        openNotificationSuccess("Chỉnh sửa Đề tài hướng dẫn KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteTopic = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.deleteTopic(id);

        openNotificationSuccess("Xoá Đề tài hướng dẫn KLTN thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetTopic({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    topics: data,
    isTopicLoading: loading,
    isModifiedTopicLoading: isModifiedLoading,
    refreshTopic: handleGetTopic,
    createTopic,
    updateTopic,
    deleteTopic,
  };
};

export default useTopic;