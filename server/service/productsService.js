const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const path = require('path');

class ProductService {
    constructor() {
        this.ProductsSchema = new Schema({
            name: {
                type: String,
                required: 'Require Name',
            },
            description: String,
            price: {
                type: Number,
                required: 'Require Price'
            },
            group: {
                type: String,
                required: 'Require Group',
            },
            catalogNumber: {
                unique: true,
                type: Number,
                required: 'Require Catalog Number'
            },
            image: {
                type: String,
                // default: path.join(__dirname, '../assets/broken-image.png'),
                default: 'https://bitsofco.de/content/images/2018/12/broken-1.png',
            },
            frozen: {
                type: Boolean,
                default: false,
            },
            sale: {
                type: Boolean,
                default: false,
            }
        });
        //connect shema to DB in mongo
        mongoose.model('Products', this.ProductsSchema);
        this.Products = mongoose.model('Products');
    }

    products(callback) {
        this.Products.find({}, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    }

    deleteProduct = (productCatalogNumber, callback) => {
        this.Products.deleteOne({
                'catalogNumber': productCatalogNumber,
            },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, usr);
            }
        );
    }

    newProduct(product, callback) {
        console.log(path.join(__dirname, '../assets/broken-image.png'));
        product.price = Number(product.price).toFixed(2);
        const finalProduct = new this.Products({
            'name': product.name,
            'catalogNumber': product.catalogNumber,
            'description': product.description,
            'price': product.price,
            'group': product.group,
            'image': product.image,
        });
        finalProduct.save()
        .catch((err) => {
            callback(err, null)
        });
    }

    updateProduct = (product, callback) => {
        product.price = Number(product.price).toFixed(2);
        this.Products.updateOne({
            'catalogNumber': product.catalogNumber,
        }, {
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'group': product.group,
            'image': product.image,
            },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, usr);
            }
        );
    }

}

module.exports = {
    productsService: new ProductService()
}