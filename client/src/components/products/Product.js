import React, { useState, useEffect, useRef } from "react";
import "./style/card.css";
import axios from 'axios';
import JsBarcode from 'jsbarcode';

import UpdateProductDialog from './Dialog/UpdateProductDialog';
import { URL } from '../../services/Api';

import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { FaTools } from "react-icons/fa";

function Product() {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});
  
  useEffect(()=>{
    products.map((product)=>{
      JsBarcode(`#a${product.catalogNumber}`, product.catalogNumber, {
        height:30,
        width:2,
        displayValue: false
      });
    })
  },[products])
  
  const deleteProduct = async (product) => {
    await axios.post(`${URL}products/deleteproducts`, product);
  }
  
  useEffect(async () => {
    const product = await axios.get(`${URL}products/products`);
    const productsData = await product.data;
    setProducts([...productsData]);
  }, [update, deleteProduct]);

  const handleClose = () => {
    setUpdate(false);
  };
  
  const handleOpen = (productValue) => {
    setUpdateProduct(productValue);
    setUpdate(true);
  }

  const dialog = (updateProduct.name &&
    <UpdateProductDialog
      product={updateProduct}
      open={update}
      onClose={handleClose}
    />
  )

  return (
    <div className="products-page">
      {products.map(product => {
        return (
          <div className="card" key={product._id}>
            <div>
              <button onClick={() => deleteProduct(product)} className="trashBtn"><FiTrash2 size={20} /></button>
              <button onClick={() => handleOpen(product)} className="updateBtn"><FaTools size={20} /></button>
            </div>
            <div className="image-card">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h3 className="title-card">{product.name}</h3>
            {product.catalogNumber && <canvas id="barcode" className="catalogNumber" id={'a'+ product.catalogNumber}/>}
            <div className="footer-card">
              <p>קטגוריה: {product.group}</p>
              <div className="price"><h5> {Number(product.price).toFixed(2)} ש"ח</h5></div>
              <div className="toCart">
                <input
                  className="quantity"
                  type="number"
                  defaultValue={1}
                  onChange={(event) => product.quantity = Number(event.target.value)}
                  min="1"
                  max="199"
                ></input>
                <button className="add-to-cart" onClick={() => {
                  console.log(product)
                }}><FiShoppingCart size={18} /> Add to cart </button>
              </div>
            </div>
          </div>
        );
      })}
      {dialog}
    </div>
  );
}

export default Product;
