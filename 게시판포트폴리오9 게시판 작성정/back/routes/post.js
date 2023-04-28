const express = require('express');
const { Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//params는 변수를 담는다
//게시글 작성
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    // 그냥 저장하면 위에꺼 밖에 안 들어 있으니까.
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image, // 게시글에 달린 이미지
        },
        {
          model: Comment, // 게시글에 달린 코멘트
        },
        {
          model: User, // 게시글 작성자
        },
      ],
    });
    res.status(201).json(fullPost); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//동적 주소를 파라미터라 한다  //POST /post/comment
router.post('/:postId/comment', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, //위에가 :postId니까
    });
    if (!post) {
      //post가 존재하지 않으면
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {
  //DELETE /post
  res.send('api post delete 창이다');
});

module.exports = router;
