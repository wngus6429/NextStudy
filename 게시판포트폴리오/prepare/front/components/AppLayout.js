import React, { useState } from "react"; //없어도됨
import Proptypes from "prop-types";
import Link from "next/link"; //next 자체적 라우터
import { Menu, Input, Row, Col } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { TwitterOutlined } from "@ant-design/icons";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const suffix = (
  <TwitterOutlined
    style={{
      fontSize: 20,
      color: "#1890ff",
    }}
  />
);
const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>홈 화면</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput placeholder="검색어 입력" enterButton="검색" size="large" suffix={suffix} />
          {/* <Input.Search enterButton style={{ verticalAlign: "middle" }} /> */}
        </Menu.Item>
        <Menu.Item>
          <Input.Search placeholder="input search text" style={{ width: 200, margin: "0 10px" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원등록</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://wngus6429.github.io/NewPortFolio/" target="_blank" rel="noopener noreferrer">
            포트폴리오
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired, //리액트의 node
};

export default AppLayout;

// target="_blank" rel="noopener noreferrer" 보안관련
