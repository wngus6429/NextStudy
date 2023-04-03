import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';
// import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "./user";

// 댓글 객체에 접근 할려면 게시글을 찾고 아이디를 통해서 찾고
// 그 안에 Comments 여기로 접근,
export const initialState = {
  mainPosts: [],
  imagePaths: [], // 이미지 경로들
  hasMorePosts: true, // 처음에 가져올 시도를 해야하니 당연 true
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
//  왜 User, Image, Comment만 첫글자에 대문자냐? db에서 쓰는 시퀄라이즈랑 관계있는데.어떤 정보와 다른 정보가 관게가 있으면 그것을 합쳐줌
// 합쳐준 애들은 대문자가 되기 때문 , id나 content는 게시글 속성이고
// 대문자가 있는 것들은 id가 있어야함
// 미리 서버 개발자한테 물어보는게 좋지
// action은 객체이다

// 더미데이터를 나중에 성능최적화까지 고려하면 수천개 하는게 좋음
// 하나도 끊김없이 렌더링 되는거 그게 실력, 화면만 잘 만들면 하수
// 더미데이터로 여러가지 테스트, 무한스크롤링 등등 해볼수 있다
// 프론트엔드 개발자는 백엔드 개발자가 준비가 덜 되었더라도, 리덕스, 사가, 딜레이같은거
// 미리 프론트를 만들어둬야함. 데이터구조는 미리 회의 해두는게 좋지
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(), // faker 공식문서 참조
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

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

export const dummyPost = (data) => ({
  id: data.id, // AddPost 할때 id 만들어줌
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

export const dummyComment = (data) => ({
  id: shortId.generate(), // 이놈을 key로 사용중
  content: data,
  User: {
    id: 1,
    nickname: '더미코멘트',
  },
});

// reducer란 이전 상태를 액션을 통해 다음 상태로 만들어내는
// immer가 불변성을 도와줌, draft라는 이름의 state임.
// 밑에 보면 ...state가 사라짐
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break; // break 꼭 적어야함
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        // action.data에 더미데이터들이 들어있을거고 그거랑 기존데이터랑 합쳐줌, 계속 추가하는거지
        draft.hasMorePosts = draft.mainPosts.length < 50; // 게시글 50개만 보겟다고
        break; // dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break; // break 꼭 적어야함
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break; // dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break; // dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      // action.data.content, postId, userId 가 들어있겟지
      // 불변성의 핵심은 바뀌는것만 새로운 객체로 만들고 나머지느 ㄴ객체는 참조를 유지함
      // 그래야 바뀌는것만 바뀌고 안바뀌는거는 참조가 계속 유지되서 메모리를 절약 하는거임
      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      // return {
      //   ...state,
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      // }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      // return {
      //   ...state,
      //   addCommentLoading: false,
      //   addCommentError: action.error,
      // }
      default:
        break;
    }
  });
};

export default reducer;

// const ADD_POST = "ADD_POST";
// //이렇게 빼주면 좋은점이 밑에 ,case ADD_POST처럼 const값을 재활용 할수 있음
// //그리고 변수 선언으로 인해 오타 방지
// export const addPost = {
//   type: ADD_POST,
// };
