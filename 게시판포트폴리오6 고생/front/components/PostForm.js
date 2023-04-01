import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useinput from '../hooks/useinput';

// const { Input } = require("antd");

const PostForm = () => {
  const { addPostDone, imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [Text, onChangeText, setText] = useinput('');

  // addPostDone을 감지해서 작동
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(Text));
  }, [Text]);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={Text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          쨱짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>;
        })}
      </div>
    </Form>
  );
};

export default PostForm;

//hidden은 밑에 다른 Button (이미지 삽입) 을 사용하기 위해서 안보이게 한것
