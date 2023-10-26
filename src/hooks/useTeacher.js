import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import usersService from "services/UsersService";

const useTeacher = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetTeacher = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await usersService.getUserList(
          QueryString.stringify({
            ...filter,
            role: "teacher",
          })
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

  const createTeacher = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await usersService.createUser({
          ...body,
          username: body?.code,
          role: "teacher",
        });

        openNotificationSuccess("Thêm mới Giáo viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateTeacher = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await usersService.updateUser(id, body);

        openNotificationSuccess("Chỉnh sửa Giáo viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const deleteTeacher = useCallback(
    async (id) => {
      setIsModifiedLoading(true);

      try {
        await usersService.deleteUser(id);

        openNotificationSuccess("Xoá Giáo viên thành công");
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
      handleGetTeacher({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    teachers: data,
    isTeacherLoading: loading,
    isModifiedTeacherLoading: isModifiedLoading,
    refreshTeacher: handleGetTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};

export default useTeacher;
