const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Hagan Shel Sahron" });
});

/* POST login user page */
// router.post("/login", passport.authenticate("local", { session: false, failureRedirect: "/err" }),
//   (req, res, next) => {
//     res.json(req.user);
//   });
// router.get('/err', (req, res)=>{ res.status(401).send('not autorized') });

module.exports = router;
