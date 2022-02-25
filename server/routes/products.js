const express = require("express");
const router = express.Router();
const {productsController} = require('../controller/productsController');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.get('/products', (req, res) => productsController.products(req, res));
router.post('/deleteproducts', (req, res) => productsController.deleteProduct(req, res));
router.post('/newproducts', (req, res) => productsController.newProduct(req, res));
router.post('/updateproducts', (req, res) => productsController.updateProduct(req, res));

module.exports = router;