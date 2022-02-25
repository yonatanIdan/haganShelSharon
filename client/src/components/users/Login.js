import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const loginHendler = () => {
    if (userName !== "" && password !== "") {
      console.log(`user: ${userName}, password: ${password}`);
      setShowLogin(false);
    } else alert("you have some problem!");
  };

  const logoutHendler = () => {
    setShowLogin(true);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      {/* {showLogin ? (
        <div>
          <h3 className="header">Login</h3>
          <div className="inputs">
            <input
              type="text"
              onChange={(event) => setUserName(event.target.value)}
              placeholder="yonatan..."
            ></input>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="****"
            ></input>
            <button type="submit" onClick={loginHendler}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>hii {userName}</p>
          <button onClick={logoutHendler}>logout</button>
        </div>
      )} */}

      {showLogin ? 
      (<Form onSubmit={loginHendler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            autoFocus
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form> 
      )
      :
      (
        <div>
          <p>hii {userName}</p>
          <button onClick={logoutHendler}>logout</button>
        </div>
      )
      }
    </div>
  );
}

export default Login;
