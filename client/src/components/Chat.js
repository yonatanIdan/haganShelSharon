import React, { useState, useEffect } from 'react';
import './style/chat.css';

function Chat({socket}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const messageHandler = async () => {
    if(message != ''){
      const messageObject = {
        data: message,
        time: 
          new Date(Date.now()).getHours() 
          + ':' +
          new Date(Date.now()).getMinutes() 
      }
      await socket.emit("sendMessage", messageObject);
      setMessages((messages) =>[...messages,messageObject]);
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on("getMessage", (newMessage)=>{
      setMessages((messages) => [...messages,newMessage]);
    })
  },[socket])

  return <div>
    <div className="chat-header"><h3 className="chat-title">live chat</h3></div>
    <div className="chat-body">
    {messages.map((message, key) => {
      return <div className="messages" key={key}>
        <div>{message.data}</div><div>{message.time}</div></div>
    })}
    </div>
    <div className="chat-input">
      <button className="message-button" onClick={messageHandler}>&#8594;</button>
      <input type="text" className="message-input" placeholder="Message..." value={message} 
        onKeyPress={(event)=>{event.key === "Enter" && messageHandler();}}
        onChange={(event)=>setMessage(event.target.value)}/>
    </div>
  </div>;
}

export default Chat;
