import React, { useCallback } from "react";
//게시글의 id를 애가 받아야함
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useinput from "../hooks/useinput";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id); //로그인 안했으면 me가 없기 때문에 없는 경우를 대비해줘야한다
  const [commentText, onChangeCommentText] = useinput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button style={{ position: "absolute", right: 0, bottom: -37 }} type="danger" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
