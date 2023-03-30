const express = require("express");
const multer = require("multer");
const path = require("path"); //node에서 제공
const fs = require("fs"); //파일시스템을 조작할수 있는
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
//params는 변수를 담는다
//게시글 작성

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uplaods폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      //제로초.png , 이름 같이 되는걸 막기 위해 날짜 붙이기
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //제로초
      done(null, basename + "_" + new Date().getTime() + ext); //제로초날짜.png
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 }, //15MB
}); //대형 서비스되면 프론트에서 바로 클라우드로 가는 방법 써야함

router.post("/", isLoggedIn, upload.none(), async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (req.body.image) {
      //이미지를 올린경우
      //post에 내용을 추가하기 위한 코드들
      if (Array.isArray(req.body.image)) {
        //이미지를 여러개 올리면 image:[제로초.png, 부기초.png] 이런식으로 옴
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        //create는 시퀄라이즈 . promise.all로 한방에 DB에 저장된다 // DB에는 파일주소만 현재
        await post.addImages(images);
      } else {
        //이미지를 하나만 올리면 image:제로초.png 배열이 아님
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, //게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, //좋아요 누른사람
          as: "Likers", //이렇게 해야 구별이됨
          attributes: ["id"],
        },
      ],
    });
    console.log("게시글작성", fullPost);
    res.status(201).json(fullPost); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Post /post/images , array쓰는 이유는 여러장, single 쓰면 한장, 텍스트면 none
//field는 이미지 올리는 칸이 2개 이상일 경우
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  //여기는 이미지 업로드 후에 실행된다
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

//동적 주소를 파라미터라 한다  //POST /post/comment
router.post("/:postId/comment", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, //위에가 :postId니까
    });
    if (!post) {
      //post가 존재하지 않으면
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH /post/1/like
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    //post 있는지 검사를 해야지
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    //포스트가 있따면
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /post/1/like
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    //post 있는지 검사를 해야지
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id); //여기다가 그냥 SQL 적어도됨. mysql2 확인
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//DELETE /post
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      //시퀄라이즈에서는 제거할때 destory를 쓴다 , 남이 삭제 못하게 2개로
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }, //게시글 id랑, 내가 쓸 게시글
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

//DB조작 할때는 항상 await 붙여줘야함

//findone , finall로 조회, create로 만들고, destory로 삭제하고, 수정하는건
