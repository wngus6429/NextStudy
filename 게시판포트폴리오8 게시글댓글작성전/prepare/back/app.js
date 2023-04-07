const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const db = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(
  cors({
    origin: '*',
  })
);

passportConfig();

//프론트에서 온 정보를 req.body안에 넣어주는 역할을 이 두줄이 한다
app.use(express.json()); //프론트에서 온 json형식 데이터를 req.body안에 넣음
app.use(express.urlencoded({ extended: true }));
//form submit을 했을때 url인코딩 방식으로 데이터가 오는데.form 데이터를 req.body에 연결
app.use(cookieParser(process.env.COOKIE_SECRET)); //브라우저랑 백엔드 정보 일치를 위해, 문자 이상하게 보냄
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
); //쿠키/세션과 전체 로그인 흐름 3분
//브라우저는 누구나 접속 하기에 해킹 위험, 위험한 곳에는 랜덤한 문자열 보내주고 그걸 받아서 백엔드에서 원래 데이터를 복원할수 있게
//쿠키에다가 ID만 매칭하는 방법 사용
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);
// 앞에 "/post"를 붙임으로 인해서
//! routes폴더 post.js안에 있는 라우터들 앞에 자동으로 /post가 붙음
//! 중복제거 , 앞에 post붙이는걸 프리픽스라고 한다

app.use('/user', userRouter);

//에러처리 미들웨어는 여기쯤에 내부적으로 있음

app.listen(3065, () => {
  console.log('서버 실행 중!');
});

//브라우저 주소창에 치는건 get 요청임
//post, delete를 보내려면 프론트처럼, axios 같은거롤 자바스크립트로 post요청을 보내거나
//postman같은 툴이 필요하다 postman으로 post, put, patch같은거 다 사용가능
