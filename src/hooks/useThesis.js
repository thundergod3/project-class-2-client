import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import thesesService from "services/ThesesService";

const useThesis = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [dataDetail, setDataDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetThesisList = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await thesesService.getThesisList(
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

  const handleGetThesisDetail = useCallback(
    async (id) => {
      try {
        setLoading(true);

        const { data } = await thesesService.getThesisDetail(id);

        setDataDetail(data);
        setLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setLoading(false);
      }
    },
    [openNotificationError]
  );

  const createThesis = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.createThesis(body);

        openNotificationSuccess("Đăng ký bảo vệ KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateThesis = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.updateThesis(id, body);

        openNotificationSuccess("Chỉnh sửa bảo vệ KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteThesis = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.deleteThesis(id, body);

        openNotificationSuccess("Xoá bảo vệ KLTN thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const approveThesis = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.approveThesis(id, body);

        openNotificationSuccess("Phê duyệt bảo vệ KLTN thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const createFinishThesis = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.createFinishThesis(body);

        openNotificationSuccess("Đăng ký kết quả bảo vệ KLTN thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const assignReviewTeacher = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.assignReviewTeacher(id, body);

        openNotificationSuccess("Phân công giảng viên phản biện thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateCouncil = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        await thesesService.updateCouncil(id, body);

        openNotificationSuccess("Chỉnh sửa hội đồng bảo vệ thành công");
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
      handleGetThesisList({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    theses: data,
    thesisDetail: dataDetail,
    isThesisLoading: loading,
    isModifiedThesisLoading: isModifiedLoading,
    refreshThesis: handleGetThesisList,
    getThesisDetail: handleGetThesisDetail,
    createThesis,
    updateThesis,
    approveThesis,
    deleteThesis,
    createFinishThesis,
    assignReviewTeacher,
    updateCouncil,
  };
};

export default useThesis;
