const router = require("express").Router();
const { User } = require("../../models");
  

router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password
  })
      .then(dbUserData => {
          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json(dbUserData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: { username: req.body.username },
      });
      if (!userData) {
        res
          .status(400)
          .json({ message: "Incorrect username or password, try again" });
        return;
      }
      const vaildPassword = await userData.checkpassword(req.body.password);
  
      if (!vaildPassword) {
        res.status(400).json({
          message: "Incorrect username or password, try again",
        });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: "Logged in!" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports =router;