import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import io from 'socket.io-client';

import Navbar from './components/app-wrapper/Navbar';
import Footer from './components/app-wrapper/Footer';
import PageNotFound from './components/app-wrapper/PageNotFound';
import Product from './components/products/Product';
import Controller from './components/Controller';
import History from './components/History';
import Chat from './components/Chat';
import Login from './components/users/Login';

import { URL } from './services/Api'

const socket = io.connect(URL);

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/controller" element={<Controller/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <div className="chat-bubble">
          <div className="symbols" onClick={()=>setShowChat(!showChat)}>
            {!showChat ? <p className="symbol">&#9743;</p> : <p className="symbol">&#9742;</p>}
          </div>
        </div>
        {showChat && <div className="chat">
          <Chat socket={socket}/>
        </div>}
        <Footer/>
      </div>
  );
}

export default App;
