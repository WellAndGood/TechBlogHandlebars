const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id'
})
Post.belongsTo(User)

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(Post)

Comment.belongsToMany(User, {
    through: 'Post_Link',
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = {User, Post, Comment};