import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from '../../services/Api';

import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

function AddUser() {
    const [user, setUser] = useState({role: 'client'});
    const [validated, setValidated] = useState(false);
    const [kindergartens, setKindergartens] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  useEffect(async ()=>{
    let kindergartens = await axios.get(`${URL}kindergartens/kindergartens`);
    const kindergartensData = await kindergartens.data;
    setKindergartens(kindergartensData);
    console.log(kindergartensData);
  },[user.role === 'client']);

  const addUser = async (event) => {
    event.preventDefault();
    await axios.post(`${URL}users/newusers`, user);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      addUser(event);
      document.newUser.reset();
    }
    setValidated(true);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>הוספת משתמש</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        name="newUser"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>User name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="name..."
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="5">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Phone number..."
              required
              pattern="[0-9]{10}"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" onChange={handleChange}>
            <option value="client">Client</option>
            <option value="collector">Collector</option>
            <option value="manager">Manager</option>
            </Form.Select>
          </Form.Group>
          {user.role === 'client' && <Form.Group as={Col} md="5">
            <Form.Label>Kindergarten</Form.Label>
            <Form.Select name="kindergarten" onChange={handleChange} defaultValue="" required={user.role === 'client'}>
              <option disabled value="">-----</option>
              {kindergartens.map((kindergarten, key)=>{
                return <option value={kindergarten._id} key={key}>{kindergarten.name} - {kindergarten.city}</option>
              })}
            </Form.Select>
          </Form.Group>}
          <Form.Group as={Col} md="5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <div>
            <Button type="submit" variant="outline-success" style={{marginLeft: '10px'}}>
            Add user
            </Button>
            <Button type="reset" variant="outline-danger">
            Reset form
            </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddUser