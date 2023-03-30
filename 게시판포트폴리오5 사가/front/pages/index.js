import React from "react"; //next는 이거 없어도됨
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

//next는 pages라는 폴더를 인식한다 그래서 그 파일을 개별적인 페이지 컴포넌트로 만들어짐

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
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

//위에 index를 key로 하면 안됨. 특히 게시글이 지워질 가능성이 있는경우에는 특히
//순서가 달라지거나 중간에 뭐가 추가될때 key를 index로 쓰면안됨.
//바뀌지 않는거다. 반복문이 있고 그 데이터가 바뀌지 않을때는 key를 index로 쓸수 있음.
//post안에 id를 사용
