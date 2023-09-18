import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import modulesService from "services/ModulesService";

const useModule = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetModule = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await modulesService.getModuleList(
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

  const createModule = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await modulesService.createModule(body);

        openNotificationSuccess("Thêm mới Giáo viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateModule = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await modulesService.updateModule(id, body);

        openNotificationSuccess("Chỉnh sửa Giáo viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteModule = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await modulesService.deleteModule(id);

        openNotificationSuccess("Xoá Giáo viên thành công");
      } catch (error) {
        openNotificationError(error?.message || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetModule({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    modules: data,
    isModuleLoading: loading,
    isModifiedModuleLoading: isModifiedLoading,
    refreshModule: handleGetModule,
    createModule,
    updateModule,
    deleteModule,
  };
};

export default useModule;
