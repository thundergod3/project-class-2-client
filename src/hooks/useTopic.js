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
        openNotificationError(error?.response?.data?.msg || "Something error");
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
        openNotificationError(error?.response?.data?.msg || "Something error");
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
        openNotificationError(error?.response?.data?.msg || "Something error");
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
        openNotificationError(error?.response?.data?.msg || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const registerTopic = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.registerTopic(id);

        openNotificationSuccess("Đăng ký đề tài hướng dẫn KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const unRegisterTopic = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.unRegisterTopic(id);

        openNotificationSuccess("Huỷ đăng ký đề tài hướng dẫn KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const proposalTopic = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        const { data } = await topicsService.proposalTopic(body);

        if (data?.msg) {
          openNotificationError(data?.msg);
          setIsModifiedLoading(false);

          return false;
        } else {
          openNotificationSuccess(
            "Thêm mới Đề xuất đề tài hướng dẫn KLTN thành công"
          );
        }

        setIsModifiedLoading(false);

        return true;
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const approveTopic = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.registerTopic(id, body);

        openNotificationSuccess("Phê duyệt Đề tài hướng dẫn KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const unApproveTopic = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await topicsService.deleteTopic(id);

        openNotificationSuccess(
          "không phê duyệt Đề tài hướng dẫn KLTN thành công"
        );
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
    registerTopic,
    unRegisterTopic,
    proposalTopic,
    approveTopic,
    unApproveTopic,
  };
};

export default useTopic;
