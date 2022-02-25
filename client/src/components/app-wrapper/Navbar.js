import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./style/navbar.css";

import { Tabs, Tab } from "react-bootstrap";

function Navbar() {
  const [search, setSearch] = useState("");
  const [key, setKey] = useState("home");

  useEffect(() => {
    setTimeout(() => {
      console.log(search);
    }, 2000);
  }, [search]);

  return (
    <div className="navbar">
      <img className="logo" src={require("../image/logo.jpg")} height={100} />
      <div className="nav nav-tabs">
        <NavLink className="nav-itam nav-link" to="/">עמוד הבית</NavLink>
        <NavLink className="nav-itam nav-link" to="/product">חנות</NavLink>
        <NavLink className="nav-itam nav-link" to="/controller">שליטה</NavLink>
        <NavLink className="nav-itam nav-link" to="/history">היסטוריה</NavLink>
        <NavLink className="nav-itam nav-link" to="/map">מפת כתובות</NavLink>
        <NavLink className="nav-itam nav-link" to="/about">about</NavLink>
      </div>

      {/* <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 controlled-tab"
      >
        <Tab eventKey="home"  className="tab" title="עמוד הבית" active></Tab>
        <Tab eventKey="store" to="/product" className="tab" title="חנות"></Tab>
        <Tab eventKey="controller" className="tab" title="שליטה"></Tab>
        <Tab eventKey="history" className="tab" title="היסטוריה" ></Tab>
        <Tab eventKey="about" className="tab" title="about" ></Tab>
        <Tab eventKey="Logout" className="tab" title="Logout" ></Tab>
      </Tabs> */}

      <input
        type="text"
        className="search"
        alt="search"
        placeholder="Search..."
        onChange={(event) => setSearch(event.target.value)}
      />

      <div><button type="button" className="btn btn-warning m-4">Logout</button></div>
    </div>
  );
}

export default Navbar;
