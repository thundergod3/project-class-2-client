import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import store from "stores/configureStore";
import { Provider } from "react-redux";

import history from "utils/history";
import theme from "themes";

import App from "./App";

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <ChakraProvider theme={theme}>
          <Switch>
            <App />
          </Switch>
        </ChakraProvider>
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
