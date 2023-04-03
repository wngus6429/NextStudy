import React, { useEffect } from 'react'; // next는 이거 없어도됨
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

// next는 pages라는 폴더를 인식한다 그래서 그 파일을 개별적인 페이지 컴포넌트로 만들어짐

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  // 메인 페이지가 나올때 바로 useEffect도 되겠지
  // Componentsdidmount 효과, 빈배열뒤에 넣으면
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY, // 얼마나 내렸는지 위치,
        document.documentElement.clientHeight, // 화면에서 보이는 길이
        document.documentElement.scrollHeight // 총 길이, 맨 밑에 내렸을때 위 두개 더한게 이거
      );
      // 끝에서 300픽셀 뺸 길이보다 더 많이 내렸으면
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          // 이미 다 불러왔거나, 아니면 불러오는 중이면 더 이상 LOADPOSTREQUEST를 하지 못하게
          // 뒤에 !loadPostsLoading 안 붙이면 리퀘스트가 엉망이 될수 있어서 조건 하나더 추가
          // 리퀘스트 한번에 석세스 한번 규칙 차례대로
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      // 윈도우에서 addEvent 하면 주의해야할게 리턴을 꼭 해줘야함
      // 스크롤 했던거 해제 해야함. 아니면 메모리에 쌓임
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

// 위에 index를 key로 하면 안됨. 특히 게시글이 지워질 가능성이 있는경우에는 특히
// 순서가 달라지거나 중간에 뭐가 추가될때 key를 index로 쓰면안됨.
// 바뀌지 않는거다. 반복문이 있고 그 데이터가 바뀌지 않을때는 key를 index로 쓸수 있음.
// post안에 id를 사용
