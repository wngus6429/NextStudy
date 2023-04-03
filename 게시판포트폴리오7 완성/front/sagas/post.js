import { all, fork, delay, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
  return axios.get('/api/posts', data); // 로그인 요청 함
}
function* loadPosts(action) {
  try {
    //  const result = yield call(loadPostsAPI, action.data);
    yield delay(1000); // 가짜 로딩시간
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data); // 로그인 요청 함
}
function* addPost(action) {
  try {
    //  const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME, // 게시글 작성하면 게시글에 대한 id와
      data: id, // 유저 id를 연결 해야하니까
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete('/api/post', data); // 로그인 요청 함
}
function* removePost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      // user Reducer 조작부분
      type: REMOVE_POST_OF_ME, // 게시글 작성하면 게시글에 대한 id와
      data: action.data, // 유저 id를 연결 해야하니까
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post('/api/post/${data.id}/comment', data); // 로그인 요청 함
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
} //  스크롤 움직이면 너무 많이 실행되기 때문에 한번만 되게끔 2초안에

//  하나라도 action이 적은게 좋다
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadPosts), fork(watchRemovePost), fork(watchAddComment)]);
}

//  function* watchAddPost() {
//      yield throttle("LOG_POST_REQUEST", addPost, 2000); // 2초동안 리퀘스트 딱 1번만
//  }
