const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Post, Comment } = require("../../models");

// Gets all available comments ✔️
router.get('/', async (req, res) => {
    // if (!req.session.user_id) {
    //     res.redirect("/")
    // }
    try {
        const dbCommentData = await Comment.findAll();
        const commentPlain = dbCommentData.map((post) => post.get({ plain: true }))
        
        res.status(200).json(commentPlain);
    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});

// Gets the comments of a specific blog's id ✔️
router.get('/blog/:id', async (req, res) => {
    // if (!req.session.user_id) {
    //     res.redirect("/")
    // }
    try {
        const dbCommentData = await Comment.findAll({
            where: {
                postId: req.params.id
            }
        });
        const commentPlain = dbCommentData.map((post) => post.get({ plain: true }))
        
        for (let i = 0; i < commentPlain.length ; i++) {
            const dbUserData = await User.findOne({where: {
                id: commentPlain[i].user_id
            }})
            commentPlain[i].username = dbUserData.username
        }

        console.log(commentPlain)

        res.status(200).json(commentPlain);
    } catch {
        console.log(error)
        res.status(500).json(err);
    }
});

// POST method ✔️
router.post('/', async (req, res) => { 
    // if (!req.session.user_id) {
    //     res.redirect("/")
    // }
    try { 

    // A POST-compatible comment data structure 
      const commentData = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id // does not work!
      });

      console.log(req.session.user_id)
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;