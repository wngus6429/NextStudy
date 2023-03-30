import produce from "immer";

export const initialState = {
  followLoading: false, //팔로우시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, //언팔로우 시도중
  unfollowDone: false, //
  unfollowError: null,
  logInLoading: false, //로그인 시도중
  logInDone: false, //
  logInError: null,
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, //회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, //닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpDate: {},
  loginData: {},
};
//export 해둬야 index.js에서 모으지

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data) => ({
  ...data,
  nickname: "주현",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: "부기초" }, { nickname: "감자" }, { nickname: "야이" }],
  Followers: [{ nickname: "치킨" }, { nickname: "피자" }, { nickname: "양념" }],
}); //시퀄라이즈에서 합쳐주기 때문에 앞에 대문자 인것들이 있다.

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

// => { return produce 임 ㅋㅋ 생략방법임
//draft를 불변성 상관없이 바꾸면 알아서 다음 draft를 보고 다음 state를 불변성있게 만들어줌
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST:
        draft.followLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
        break; //지울때는 필터를 많이 사용한대, 제로초의 경우 , 그 사람만 빠지는 로직
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false; //바꾸고 싶은걸 이렇게 적어준다.
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false; //바꾸고 싶은걸 이렇게 적어준다.
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true; //바꾸고 싶은걸 이렇게 적어준다.
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error; //바꾸고 싶은걸 이렇게 적어준다.
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
      //   },
      // };
      default:
        break;
    }
  });

export default reducer;

// // action creator 유저가 닉네임 어떻게 바꿀지 모르니 이렇게 해야함
// const changeNickname = (data) => {
//   return {
//     type: CHANGE_NICKNAME,
//     data,
//   };
// };
// changeNickname("boogicho");
// // { type:"CHANGE_NICKNAME", data:"boogicho" }
// //store.dispatch(changeNickname('mighty tak')); //이게 좋지
