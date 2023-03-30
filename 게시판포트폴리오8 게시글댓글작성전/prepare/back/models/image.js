module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      //MySql 에는 users테이블 생성
      //id는 mysql에서 자동으로 넣어줌
      src: { type: DataTypes.STRING(200), allowNull: false },
    },
    {
      charset: "utf8", //mb4는 이모티콘도 가능하게끔
      collate: "utf8_general_ci", //한글저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
