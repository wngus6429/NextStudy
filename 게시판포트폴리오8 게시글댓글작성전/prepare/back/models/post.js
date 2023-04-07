module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      //MySql 에는 users테이블 생성
      //id는 mysql에서 자동으로 넣어줌
      content: { type: DataTypes.TEXT, allowNull: false },
    }, //! TEXT는 길이 무제한
    //! RetweetId
    {
      charset: 'utf8mb4', //mb4는 이모티콘도 가능하게끔
      collate: 'utf8mb4_general_ci', //한글저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //! 어떤 게시글은 어떤 작성자 한테 속해 있겟지
    //! 인스타 보면 해쉬태그 누르면 게시글 쭉 뜬다. 하나의 게시글 안에 여러 해쉬태그. 다대다
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.hasMany(db.Comment); //! 하나의 게시글에 댓글 여러개
    db.Post.hasMany(db.Image); //! 하나의 게시글이 이미지 여러개
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //! 포스트에 좋아요를 누른사람들
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); //! 리트윗 관계
  };
  return Post;
};
