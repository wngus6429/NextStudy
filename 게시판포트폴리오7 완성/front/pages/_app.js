import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css"; //다른페이지에서도 다 쓰니 여기에 적음
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
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
      <div>공통메뉴</div>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));
//이렇게 감싸는걸 hoc로 감싼다라고 함, 존안 유튜브에서 나온듯?
