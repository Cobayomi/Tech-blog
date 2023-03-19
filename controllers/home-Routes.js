const routes = require("express").Router();
const sequelize = require("../confg/connection")
const { post, user } = require("../../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, async = async (req, res) => {
    console.log(req.session)
    try {
    const postData = await Post.findAll({
        include: [User]
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('posts', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
});
module.export = router;