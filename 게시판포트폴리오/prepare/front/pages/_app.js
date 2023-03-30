import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
//import picture from "../image/1.png";
//페이지들의 공통된 부분을 처리
//굳이 이름 App 이라고 할 필요 없음.
//App이 부모, index.js가 밑에 Component안으로
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Nodebird</title>
      </Head>
      <div>몰라</div>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isrequired,
};

export default NodeBird;
