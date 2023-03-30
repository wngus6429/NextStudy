export const initialState = { isLoggedIn: false, user: null, signUpDate: {}, loginData: {} };
//export 해둬야 index.js에서 모으지

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
  };
};
// const changeNickname = {
//     type: "CHANGE_NICKNAME",
//     data: "boogicho",
//   };

//async action creator //비동기 action creator

// action creator 유저가 닉네임 어떻게 바꿀지 모르니 이렇게 해야함
const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};
changeNickname("boogicho");
// { type:"CHANGE_NICKNAME", data:"boogicho" }
//store.dispatch(changeNickname('mighty tak')); //이게 좋지

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggedIn: true, //바꾸고 싶은걸 이렇게 적어준다.
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggedIn: false, //바꾸고 싶은걸 이렇게 적어준다.
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
