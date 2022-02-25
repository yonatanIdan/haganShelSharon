import React, { useState } from "react";
import axios from "axios";
import { URL } from '../../services/Api';

import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

function AddProduct() {
  const [product, setProduct] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct((values) => ({ ...values, [name]: value }));
  };

  const addProduct = async (event) => {
    event.preventDefault();
    await axios.post(`${URL}products/newproducts`, product);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      addProduct(event);
      document.newProduct.reset();
    }
    setValidated(true);
  };

  return (
    <div style={{ margin: "20px 50px", direction: "ltr" }}>
      <h2>הוספת פריט</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        name="newProduct"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="Product name..."
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid product name.
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description..."
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid description.
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
            <Form.Label>Price</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">₪</InputGroup.Text>
              <Form.Control
                name="price"
                type="number"
                placeholder="Price..."
                // defaultValue={0}
                aria-describedby="inputGroupPrepend"
                required
                min={0}
                step="any"
                onChange={handleChange}
              />
              {/* <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
            <Form.Label>Catalog Number</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="catalogNumber"
                type="number"
                placeholder="Catalog Number..."
                required
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Group</Form.Label>
            <Form.Control
              type="text"
              placeholder="Group..."
              required
              name="group"
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid group.
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Image url</Form.Label>
            <Form.Control
              type="test"
              placeholder="Image"
              name="image"
              // disabled
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid image.
            </Form.Control.Feedback> */}
          </Form.Group>
        </Row>

        {/* יש להוסיף מק"ט */}
        
        <Button type="submit" variant="outline-success">
          Add product
        </Button>
        <Button type="reset" variant="outline-danger">
          Reset form
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
