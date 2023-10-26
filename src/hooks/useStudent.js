import { useCallback, useEffect, useState } from "react";

import useNotification from "./useNotification";
import QueryString from "utils/queryString";
import usersService from "services/UsersService";

const useStudent = ({ initialGet } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModifiedLoading, setIsModifiedLoading] = useState(false);

  const { openNotificationSuccess, openNotificationError } = useNotification();

  const handleGetStudent = useCallback(
    async (filter = { page: 0 }) => {
      try {
        setLoading(true);

        const { data } = await usersService.getUserList(
          QueryString.stringify({
            ...filter,
            role: "student",
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

  const createStudent = useCallback(
    async (body) => {
      setIsModifiedLoading(true);

      try {
        await usersService.createUser({
          ...body,
          username: body?.code,
          role: "student",
        });

        openNotificationSuccess("Thêm mới Sinh viên thành công");
        setIsModifiedLoading(false);
      } catch (error) {
        openNotificationError(error?.message || "Something error");
        setIsModifiedLoading(false);
      }
    },
    [openNotificationError, openNotificationSuccess]
  );

  const updateStudent = useCallback(
    async (id, body) => {
      setIsModifiedLoading(true);

      try {
        delete body.id;

        await usersService.updateUser(id, body);

        openNotificationSuccess("Chỉnh sửa Sinh viên thành công");
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
      handleGetStudent({
        limit: 1000000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGet]);

  return {
    students: data,
    isStudentLoading: loading,
    isModifiedStudentLoading: isModifiedLoading,
    refreshStudent: handleGetStudent,
    createStudent,
    updateStudent,
    deleteTeacher,
  };
};

export default useStudent;
