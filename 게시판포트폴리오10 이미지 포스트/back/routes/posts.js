const express = require("express");
//리밋과 오프셋 방식
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();

//Get posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, //10개만 가져와라
      order: [
        ["createdAt", "DESC"], //처음에는 게시글 생성일 내림차순으로 정렬한다음
        [Comment, "createdAt", "DESC"], //댓글들의 생성일을 내림차순
      ],
      include: [
        {
          model: User, //작성자정보
          attributes: ["id", "nickname"], //작성자 비밀번호 보이면 안되니
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"], //작성자 비밀번호 보이면 안되니
            },
          ],
        },
        {
          model: User, //좋아요 누른사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    console.log("get 게시물", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

// //Get posts
// router.get("/", async (req, res, next) => {
//     try {
//       const posts = await Post.findAll({
//         where: { id: lastId },
//         limit: 10, //10개만 가져와라
//         offset: 0, //1~10 , 리밋10,오프셋10이면 11~20이됨, 리밋10, 오프셋100 101~110
//         order: [["createdAt", "DESC"]],
//       });
//       res.status(200).json(posts);
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   });

//   module.exports = router;
