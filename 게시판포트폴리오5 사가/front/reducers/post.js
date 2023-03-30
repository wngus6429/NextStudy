export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫번째 게시글 #해시태그, #익스프레스',
      Images: [
        {
          src: 'https://image.fmkorea.com/files/attach/new3/20230212/486616/38558862/5488187476/f336b718936a37cfd9eae2cfb78099ec.png',
        },
        {
          src: 'https://img2.quasarzone.com/editor/2023/02/12/7200bfe392669a6b1d37a1ae74ff5f2d.png',
        },
        {
          src: 'https://s.gae9.com/trend/cd5f2d18dc207533.orig',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '얼른 사고싶어요',
        },
      ],
    },
  ],
  imagePaths: [], //이미지 경로들
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};
//왜 User, Image, Comment만 첫글자에 대문자냐? db에서 쓰는 시퀄라이즈랑 관계있는데.어떤 정보와 다른 정보가 관게가 있으면 그것을 합쳐줌
//합쳐준 애들은 대문자가 되기 때문 , id나 content는 게시글 속성이고
//미리 서버 개발자한테 물어보는게 좋지
//action은 객체이다

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostError: action.error };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentError: action.error };
    default:
      return state;
  }
};

export default reducer;

// const ADD_POST = "ADD_POST";
// //이렇게 빼주면 좋은점이 밑에 ,case ADD_POST처럼 const값을 재활용 할수 있음
// //그리고 변수 선언으로 인해 오타 방지
// export const addPost = {
//   type: ADD_POST,
// };
