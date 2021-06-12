const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
    const blogs = dbPostData = await Post.findAll();
    const PostPlain = blogs.map((post) => post.get({ plain: true }))
    PostPlain.reverse()
    res.render("blogposts", {
      blogArr: PostPlain     
    })
  });

router.get("/dashboard", async (req, res) => {
  
  const blogs = dbPostData = await Post.findAll({
    where: {
      id: req.session.user_id || 1
    }
  });
  const PostPlain = blogs.map((post) => post.get({ plain: true }))

  for (let i = 0; i < PostPlain.length ; i++) {
    const dbUserData = await User.findOne({where: {
        id: PostPlain[i].userId
    }})
    PostPlain[i].username = dbUserData.username
}

  res.render("dashboard", {
    blogArr: PostPlain      
  })
})

module.exports = router;


router.get("/login", async (req, res) => {
  res.render("login", {
  })
});

router.get("/newblog", async (req, res) => {
  res.render("newblog", {
  })
});