import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from 'axios';

import { URL } from '../../../services/Api';

function UpdateProductDialog(props) {
  const { onClose, product, open } = props;
  const [newProduct, setNewProduct] = useState({ ...product });
  
  const updateProduct = async () => {
    await axios.post(`${URL}products/updateproducts`, newProduct)
  }

  const handleClose = () => {
    onClose();
  };
  
  const handleChange = () => {
    updateProduct()
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>עדכון מוצר: {product.name}</DialogTitle>
      <div className="dialogInput">
        <label>Group</label>
        <input
          required
          autoFocus
          type="text"
          onChange={(event) =>
            setNewProduct({ ...newProduct, group: event.target.value })
          }
          defaultValue={product.group}
        />
        <label>Description</label>
        <input
          type="text"
          onChange={(event) =>
            setNewProduct({ ...newProduct, description: event.target.value })
          }
          defaultValue={product.description}
        />
        <label>Price</label>
        <input
          required
          type="number"
          min={0}
          onChange={(event) =>
            setNewProduct({ ...newProduct, price: event.target.value })
          }
          defaultValue={product.price}
        />
        <label>Image</label>
        <input
          // disabled
          required
          type="text"
          onChange={(event) =>
            setNewProduct({ ...newProduct, image: event.target.value })
          }
        />
        <button onClick={() => handleChange(newProduct)}>Change</button>
      </div>
    </Dialog>
  );
}
export default UpdateProductDialog;
