import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Routes } from "constants/routes";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    history.push(Routes.faculties);
  }, [history]);

  return <></>;
};

export default Homepage;
