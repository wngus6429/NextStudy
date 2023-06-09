module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //MySql 에는 users테이블 생성
      //id는 mysql에서 자동으로 넣어줌
      email: { type: DataTypes.STRING(40), allowNull: false, unique: true }, //false 이메일 필수, unique 고유값
      nickname: { type: DataTypes.STRING(40), allowNull: false },
      password: { type: DataTypes.STRING(100), allowNull: false },
    }, //비밀번호는 암호화하면 길어지기 때문에 여유롭게 잡은거
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); //사람이 포스트를 여러개 가질 수 있다
    db.User.hasMany(db.Comment); //사람이 코멘트를 여러개 가질 수 있다
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //좋아요 관계
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreinkey: "followingId" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreinkey: "followerId" });
    //
  };
  return User;
};

//STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
