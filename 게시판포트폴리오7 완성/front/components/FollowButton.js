import PropTypes from 'prop-types';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  // 팔로 하고 있는지 안하고 있는지 구별 해야지
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  // 제가 팔로잉 한사람들 목록들 중에 id들을 가지고 있을건데. 게시글 작성자에 아이디가 제 팔로잉 목록에 있다면 제가 팔로잉 하고 있는 사람이지
  const onClickbutton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickbutton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
