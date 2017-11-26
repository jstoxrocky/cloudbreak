import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import promise from "redux-promise-middleware";
import reducers from "./reducers/root-reducer";

const middleware = applyMiddleware(promise(), logger);
const store = createStore(reducers, middleware);

export default store;