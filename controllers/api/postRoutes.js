const router = require("express").Router();
const { post, user } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res) => {
    newPost.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;