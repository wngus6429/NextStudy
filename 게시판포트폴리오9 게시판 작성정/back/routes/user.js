const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

//Get /user
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      //로그인 안 했는데 매번 새로고침시 작동하면 where요쪽 에러
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        }, //원하는 정보만 받기, 비밀번호만 안 받고  싶음
        include: [
          { model: Post, attributes: ["id"] },
          { model: User, as: "Followings", attributes: ["id"] },
          { model: User, as: "Followers", attributes: ["id"] },
        ],
      });
      res.status(200).json(fullUserWithoutPassword); //사용자가 있으면 보내주고
    } else {
      res.status(200).json(null); //사용자가 없으면 안 보내줌
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//attributes: ["id"]는 아이디만 가져오게끔. 팔로잉, 팔로워 숫자만 알면 되는데 데이터 다 가져오면 렉 + 데이터 사용량 증가
//서버에서 프론트로 필요한 데이터만 보내주는거임

//애매해서 로그인 포스트 //POST //post/user/login
//이게 미들웨어 확장이라고 한다.
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      //info클라이언트 에러
      return res.status(401).send(info.reason); //401 허가되지 않음. 403 금지, http 상태코드검색
    }
    //이게 진짜 로그인 하는거
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        //혹시나 패스포트 에러가 날까 싶어서
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        }, //원하는 정보만 받기, 비밀번호만 안 받고  싶음
        include: [
          { model: Post, attributes: ["id"] },
          { model: User, as: "Followings", attributes: ["id"] },
          { model: User, as: "Followers", attributes: ["id"] },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword); //사용자 정보를 프론트로 넘겨줌
    });
  })(req, res, next);
}); //local 뒤의 부분은 passport폴더 local의 done 내용이 온거

//post/user/
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    } //리턴 안 붙이면 밑에꺼 까지 실행됨
    console.log(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok"); //200성공, 201은 의미를 둬서 생성된
  } catch (error) {
    console.error(error);
    next(error); //next로 에러보내면 편해진다, status(500)
  }
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  console.log(req.user);
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
