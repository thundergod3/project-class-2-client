import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import documentsService from "services/DocumentsService";

const useDocument = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetDocument = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await documentsService.getDocumentList(
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

  const createDocument = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await documentsService.createDocument(body);

        openNotificationSuccess("Thêm mới Tài liệu thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateDocument = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await documentsService.updateDocument(id, body);

        openNotificationSuccess("Chỉnh sửa Tài liệu thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteDocument = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await documentsService.deleteDocument(id);

        openNotificationSuccess("Xoá Tài liệu thành công");
      } catch (error) {
        openNotificationError(error?.response?.data?.msg || "Something error");
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  useEffect(() => {
    if (initialGet) {
      handleGetDocument({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    documents: data,
    isDocumentLoading: loading,
    isModifiedDocumentLoading: isModifiedLoading,
    refreshDocument: handleGetDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useDocument;
