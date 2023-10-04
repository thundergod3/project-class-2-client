import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Routes } from "constants/routes";
import useAuthenticated from "hooks/useAuthenticated";

const Homepage = () => {
  const { isAdmin } = useAuthenticated();
  const history = useHistory();

  useEffect(() => {
    if (isAdmin) {
      history.push(Routes.faculties);
    } else {
      history.push(Routes.topics);
    }
  }, [history, isAdmin]);

  return <></>;
};

export default Homepage;
