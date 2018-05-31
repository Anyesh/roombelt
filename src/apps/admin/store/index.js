import { createStore, applyMiddleware } from "redux";
import { createPlayMiddleware } from "redux-play";

import rootReducer from "./reducers";
import rootPlay from "./plays";

const playMiddleware = createPlayMiddleware(rootPlay);
const store = createStore(rootReducer, applyMiddleware(playMiddleware));

if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextRootReducer = require("./reducers").default;
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept("./plays", () => {
    const nextRootPlay = require("./plays").default;
    playMiddleware.replacePlay(nextRootPlay);
  });
}

export default store;
