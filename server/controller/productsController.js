const { productsService } = require('../service/productsService');
class ProductsController {
    constructor() {}

    products(req, res) {
        productsService.products((err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }
    deleteProduct(req, res) {
        productsService.deleteProduct(req.body.catalogNumber, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(200, data);
        });
    }
    newProduct(req, res) {
        console.log(req.body);
        productsService.newProduct(req.body, (err, data) => {
            if (err) res.status(400).json({ Error: 'Error in Data Base', reason: err })
            else res.json(data);
        });
    }
    updateProduct(req, res) {
        productsService.updateProduct(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }

}

module.exports = {
    productsController: new ProductsController()
}