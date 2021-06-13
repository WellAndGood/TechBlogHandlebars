const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
    const blogs = dbPostData = await Post.findAll({
      include: [User]
    });
    const PostPlain = blogs.map((post) => post.get({ plain: true }))
    PostPlain.reverse()
    if (req.session.user_id) {
    res.render("blogposts", {
      blogArr: PostPlain,  
      logged_in: req.session.user_id 
    })
    } else {
      res.render("blogposts", {
        blogArr: PostPlain,   
      })
    }
  });

router.get("/dashboard", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login")
  } 
  const blogs = dbPostData = await Post.findAll({
    where: {
      user_id: req.session.user_id // || 1
    },
    include: [User]
  });
  const PostPlain = blogs.map((post) => post.get({ plain: true }))
  PostPlain.reverse()

  console.log(PostPlain)

  res.render("dashboard", {
    blogArr: PostPlain,
    logged_in: req.session.user_id        
  })
})

module.exports = router;

router.get("/login", async (req, res) => {
  res.render("login", {
  })
});

router.get("/newblog", async (req, res) => {
  res.render("newblog", {
    logged_in: req.session.user_id
  })
});

router.get("/singleblog/:id", async (req, res) => {
  try {
    const blogData = await Post.findByPk(req.params.id, {
      include: [User]
    });
    const singleBlogData = blogData.get({ plain: true });

    res.render('singleblog', {
      layout: 'main',
      ...singleBlogData,
      logged_in: req.session.user_id
    });
  } catch (err) {
    console.log(err)
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  res.render("login", {
  })
});
