import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import reducer from "../reducers";

const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === "production"
  ? compose(applyMiddleware(...middlewares)) //배포용
  : composeWithDevTools(applyMiddleware(...middlewares)) //개발용
  const store = createStore(reducer, enhancer);
  store.dispatch({
    type: 'CHANGE_NICKNAME',
    data: 'boogicho',
  });
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});
//두번째는 옵션 객체, debug를 true로 하는게 개발할떄 편함
export default wrapper;
