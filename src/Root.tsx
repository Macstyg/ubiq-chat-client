import React, { memo } from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

interface Props {}

const Root: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default memo(Root);
