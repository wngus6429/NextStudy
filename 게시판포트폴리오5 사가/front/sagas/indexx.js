// import { all, fork, call, put, take, takeEvery, throttle, delay } from "redux-saga/effects";
// //여기안에 delay, debounce, throttle, takeLastest, takeEvery, takeMaybe 같은것도 있음
// import { addPost } from "../reducers/post";
//지금 적은것들이 사가의 effect라 불림

function logOutAPI() {
  return axios.post('/api/logout'); //로그인 요청 함
}
function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data); //로그인 요청 함
}
function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

//logInAPI이거는 generator안임. * 붙이면 안됨
function logInAPI(data) {
  return axios.post('/api/login', data); //로그인 요청 함
}

//항상 effect 앞에는 yield(일드)를 붙여준다
//call, fork차이, fork는 비동기 함수 호출, call은 동기함수 호출
//call을 하면 로그인 api가 리턴 할때까지 기다림. fork는 비동기라 요청보내버리고
//결과 안 기다리고 바로 다음으로 감, call은 await이랑 비슷

//그리고 데이터를 보낼때 logInAPI(action.data) 이렇게 해야하는데, call을 쓰면
// 이걸 펼쳐줘야함 call(logInAPI, action.data); 밑에 처럼 이렇게
//첫번쨰 자리가 함수고, 그 다음에 매개변수, 인수임 ,를 써서 더 주기 가능
//굳이 yield를 안 붙여도되지만 붙이는 이유가 테스트 때문, 동작 보장이 되는가?
function* logIn(action) {
  try {
    //const result = yield call(logInAPI, action.data); //이렇게 결과값 요청후 받음
    yield delay(1000); //서버 만들어 질때까지 delay로 비동기 효과 주기
    yield put({
      type: 'LOG_IN_SUCCESS', //put은 dispatch라고 생각하면됨
      data: result.data, //성공 결과값
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    }); //요청이 항상 성공하는건 아니니까, try, catch 쓰면됨
  }
}
//애네들이 비동기 액션 크리에이터, thunk는 비동기 크리에이터를 직접 했지만
//Saga는 이벤트 리스너 같은 역할, 비유 하자면
//로그인 액션이 들어오면,로그인 제너레이터 함수를 실행 하도록, * 있는게 제너레이터 함수

//take는 문제가 1회성임. 로그인하고 로그아웃하면 로그인 이벤트가 사라진다는 말
//그래서 while을 사용하는거임. 이걸해야 진정한 이벤트 리스너 ㅋㅋ (원노트 참조)
//근데 반복문 적는건 좀 보기 안 좋고 더 좋은 기능인 takeEvery를 사용
//takeLatest 는 마지막에 클릭한거. (로딩 도중 기준) 여러번 클릭 방지, 첫번째꺼는 takeLeading
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
} //로그인이라는 action이 실행될떄까지 기다리겠다.

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}
// 하나라도 action이 적은게 좋다
function* watchAddPost() {
  yield takeLatest('LOG_POST_REQUEST', addPost);
}

//우리가 만들고 싶은 비동기 액션들을 하나씩 넣어준다.
export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
//all은 배열을 받는데. 배열에 있는 것들을 한방에 실행해줌, 그러면 위에 3개가 실행되겠지
//fork는 함수를 실행시키는거임, 이게 나중에 //call이랑은 다르다, fork대신에 call 사용가능
//차이점이 있으니 나중에 상관이 있게되면 어떻게 다른지 가르쳐줌

// function* watchAddPost() {
//     yield throttle("LOG_POST_REQUEST", addPost, 2000); //2초동안 리퀘스트 딱 1번만
// }
