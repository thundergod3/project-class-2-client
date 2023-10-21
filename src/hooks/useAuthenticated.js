import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import useNotification from "./useNotification";
import authsService from "services/AuthsService";
import useLocalStorage from "./useLocalStorage";
import { LOCAL_KEYS, ROLE } from "constants/values";
import { Routes } from "constants/routes";
import history from "utils/history";
import { setUserData } from "stores/authSlice";

const useAuthenticated = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const isAuthenticated = useMemo(() => !!localStorage.getItem("token"), []);

  const { openNotificationError } = useNotification();
  const { saveToLocal, removeAllLocal } = useLocalStorage();

  const login = useCallback(
    async (body) => {
      try {
        const { data } = await authsService.login(body);

        if (data?.msg) {
          openNotificationError(data?.msg);
        } else {
          saveToLocal(LOCAL_KEYS.token, data?.token);
          delete data.token;
          dispatch(setUserData(data));
          history.push(Routes.home);
        }
      } catch (error) {
        console.log("error", error);

        openNotificationError(error?.message || "Something error");
      }
    },
    [dispatch, openNotificationError, saveToLocal]
  );

  const logout = useCallback(async () => {
    removeAllLocal();
    history.push(Routes.login);
  }, [removeAllLocal]);

  const handleGetUserData = useCallback(async () => {
    try {
      const { data } = await authsService.myProfile();

      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 401) {
        logout();
      }
    }
  }, [dispatch, logout]);

  const isAdmin = useMemo(
    () => userData?.role === ROLE.ADMIN,
    [userData?.role]
  );
  const isTeacher = useMemo(
    () => userData?.role === ROLE.TEACHER,
    [userData?.role]
  );
  const isStudent = useMemo(
    () => userData?.role === ROLE.STUDENT,
    [userData?.role]
  );

  return {
    isAuthenticated,
    userData,
    login,
    logout,
    getUserData: handleGetUserData,
    isAdmin,
    isTeacher,
    isStudent,
  };
};

export default useAuthenticated;
