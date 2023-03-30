export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫번째 게시글 #해시태그, #익스프레스",
      Images: [
        {
          src:
            "https://cdnb.artstation.com/p/assets/images/images/029/822/295/smaller_square/sakimi-chan-kdaahri.jpg?1598749952",
        },
        {
          src:
            "https://p6m5s8c4.stackpathcdn.com/wp-content/uploads/2020/01/Screen-Shot-2020-01-28-at-12.11.51-PM.png",
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHrJIHYecs7LONs1yBDv7FmML5sSCoESzg9Q&usqp=CAU",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요",
        },
      ],
    },
  ],
  imagePaths: [], //이미지 경로들
  postAdded: false,
};
//왜 User, Image, Comment만 첫글자에 대문자냐? db에서 쓰는 시퀄라이즈랑 관계있는데.어떤 정보와 다른 정보가 관게가 있으면 그것을 합쳐줌
//합쳐준 애들은 대문자가 되기 때문 , id나 content는 게시글 속성이고
//미리 서버 개발자한테 물어보는게 좋지
//action은 객체이다
const ADD_POST = "ADD_POST";
//이렇게 빼주면 좋은점이 밑에 ,case ADD_POST처럼 const값을 재활용 할수 있음
//그리고 변수 선언으로 인해 오타 방지
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
    default:
      return state;
  }
};

export default reducer;
