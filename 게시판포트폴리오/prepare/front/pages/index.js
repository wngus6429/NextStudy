import React from "react"; //next는 이거 없어도됨
import AppLayout from "../components/AppLayout";
//next는 pages라는 폴더를 인식한다 그래서 그 파일을 개별적인 페이지 컴포넌트로 만들어짐

const Home = () => {
  return (
    <AppLayout>
      <div>Hello, Next!</div>
    </AppLayout>
  );
};

export default Home;
