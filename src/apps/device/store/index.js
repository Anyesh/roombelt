import { createStore, applyMiddleware } from "redux";
import { createPlayMiddleware } from "redux-play";

import rootReducer from "./reducers";
import * as rootPlay from "./plays";

const errorHandler = error => store.dispatch({ type: ":device--unexpected-error", error });
const playMiddleware = createPlayMiddleware(rootPlay, { errorHandler });
const store = createStore(rootReducer, applyMiddleware(playMiddleware));

if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextRootReducer = require("./reducers").default;
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept("./plays", () => {
    const nextRootPlay = require("./plays");
    playMiddleware.replacePlay(nextRootPlay);
  });
}

export default store;
