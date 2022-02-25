const express = require("express");
const router = express.Router();
const {usersController} = require('../controller/usersController');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.get('/users', (req, res) => usersController.users(req, res));
router.post('/deleteusers', (req, res) => usersController.deleteUser(req, res));
router.post('/newusers', (req, res) => usersController.newUser(req, res));
router.post('/updateusers', (req, res) => usersController.updateUser(req, res));

module.exports = router;