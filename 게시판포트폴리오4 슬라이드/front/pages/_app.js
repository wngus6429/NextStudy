import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
//페이지들의 공통된 부분을 처리
//굳이 이름 App 이라고 할 필요 없음.
//index.js에서 리턴된 값이 밑에 Component안으로
//여기가 부모 컴포넌트

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Nodebird</title>
      </Head>
      <div>공통메뉴</div>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
