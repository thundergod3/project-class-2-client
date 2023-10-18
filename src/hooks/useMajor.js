import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import majorsService from "services/MajorsService";

const useMajor = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetMajor = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await majorsService.getMajorList(
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

  const createMajor = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await majorsService.createMajor(body);

        openNotificationSuccess("Thêm mới Ngành học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateMajor = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await majorsService.updateMajor(id, body);

        openNotificationSuccess("Chỉnh sửa Ngành học thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteMajor = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await majorsService.deleteMajor(id);

        openNotificationSuccess("Xoá Ngành học thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetMajor({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    majors: data,
    isMajorLoading: loading,
    isModifiedMajorLoading: isModifiedLoading,
    refreshMajor: handleGetMajor,
    createMajor,
    updateMajor,
    deleteMajor,
  };
};

export default useMajor;
