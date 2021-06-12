const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
    const blogs = dbPostData = await Post.findAll({
      include: [User]
    });
    const PostPlain = blogs.map((post) => post.get({ plain: true }))
    PostPlain.reverse()
    console.log(PostPlain)

    res.render("blogposts", {
      blogArr: PostPlain     
    })
  });

router.get("/dashboard", async (req, res) => {
  
  const blogs = dbPostData = await Post.findAll({
    where: {
      id: req.session.user_id || 1
    },
    include: [User]
  });
  const PostPlain = blogs.map((post) => post.get({ plain: true }))

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

router.get("/singleblog/:id", async (req, res) => {
  try {
    const blogData = await Post.findByPk(req.params.id, {
      include: [User]
    });
    const singleBlogData = blogData.get({ plain: true });
    console.log(singleBlogData)

    res.render('singleblog', {
      layout: 'main',
      ...singleBlogData,
    });
  } catch (err) {
    console.log(err)
  }
});