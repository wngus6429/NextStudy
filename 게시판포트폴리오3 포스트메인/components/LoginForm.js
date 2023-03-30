import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
//import PropTypes from "prop-types";
import useInput from "../hooks/useinput";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [Id, onChangeId] = useInput("");
  // const [Id, setId] = useState("");
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);
  const [Password, onChangePassword] = useInput("");
  // const [Password, setPassword] = useState("");
  //useCallback 써야 성능이 좋아진다.
  // const onChangePassword = useCallback((e) => {
  //   setPassword(e.target.value);
  // }, []);

  const onSubmitForm = useCallback(() => {
    console.log(Id, Password);
    dispatch(loginAction({ Id, Password }));
  }, [Id, Password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={Id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={Password} onChange={onChangePassword} required />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

//const style = useMemo(()=>({ marginTop:10}),[])
//<ButtonWrapper style={style}></ButtonWrapper>

//label htmlFor랑 밑에 input name 이랑 연결 시킨거임
//type="primary 는 색을 담당한다
//htmlType="submit" 이 되어 있어야 위에 Form이 작동함 그리고 onFinish 가 호출이 된다
//그리고 onFinish에는 e.preventDefault()가 이미 되어져 있음
