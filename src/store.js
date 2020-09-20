import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./store/sagas";
import rootReducer from "./store/reducers";
import { myServiceMiddleware } from "./API/base";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(myServiceMiddleware(), sagaMiddleware)
);

const store = createStore(rootReducer, enhancer);

export default store;

sagaMiddleware.run(rootSaga);
//
