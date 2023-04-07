module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      //MySql 에는 users테이블 생성
      //id는 mysql에서 자동으로 넣어줌
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    // 댓글에 있어서 댓글쓴 사람과 댓글쓴 포스트
    //User_Id:{}  //! belongs to가 있어서
    //Post_Id:{}
    {
      charset: 'utf8mb4', //mb4는 이모티콘도 가능하게끔
      collate: 'utf8mb4_general_ci', //한글저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); //어떤 댓글은 작성자에 속해 있겟지
    db.Comment.belongsTo(db.Post);
    //! belongTo를 하게 되면 위에 user_id, post_id처럼 컬럼이 생김
  };
  return Comment;
};
