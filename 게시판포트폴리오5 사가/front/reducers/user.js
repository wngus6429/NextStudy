export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false, //
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpDate: {},
  loginData: {},
};
// export 해둬야 index.js에서 모으지

// 오타에 취약하니 변수로 빼줌
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
  ...data,
  nickname: '주현',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
}); // 시퀄라이즈에서 합쳐주기 때문에 앞에 대문자 인것들이 있다.

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      console.log('리듀서 case LOG_IN_REQUEST');
      return {
        ...state, // 안바꾸고 싶은건 ... 써서 참조
        logInLoading: true, // 바꾸고 싶은걸 이렇게 적어준다.
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      console.log('리듀서 case LOG_IN_SUCCESS');
      return {
        ...state, // 안바꾸고 싶은건 ... 써서 참조
        logInLoading: false,
        logInDone: true, // 바꾸고 싶은걸 이렇게 적어준다.
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      console.log('리듀서 case LOG_IN_FAILURE');
      return {
        ...state, // 안바꾸고 싶은건 ... 써서 참조
        logInLoading: false,
        logInError: action.error, // 바꾸고 싶은걸 이렇게 적어준다.
      };
    case LOG_OUT_REQUEST:
      console.log('리듀서 case LOG_OUT_REQUEST');
      return {
        ...state, // 안바꾸고 싶은건 ... 써서 참조
        logOutLoading: true, // 바꾸고 싶은걸 이렇게 적어준다.
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      console.log('리듀서 case LOG_OUT_SUCCESS');
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;

// // action creator 유저가 닉네임 어떻게 바꿀지 모르니 이렇게 해야함
// const changeNickname = (data) => {
//   return {
//     type: CHANGE_NICKNAME,
//     data,
//   };
// };
// changeNickname('boogicho');
// // { type:'CHANGE_NICKNAME', data:'boogicho' }
// //store.dispatch(changeNickname('mighty tak')); //이게 좋지
