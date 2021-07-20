import React, { Fragment, useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function Chat({selected_chat, user_info }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chat_history, setChatHistory] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const group_id = selected_chat.group_id;
  const group_name = selected_chat.group_name;
  const user_id = user_info.user_id;
  const user_name = user_info.user_name;

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/group/chat", {
        method: "GET",
        headers: { 
          token: localStorage.token,
          group_id: group_id 
        },
      });

      const parseRes = await response.json();
      const chat_history = JSON.parse(parseRes.chat_history);

      setChatHistory(chat_history);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
    
    socket = io(ENDPOINT);
    
    setMessages([]);

    socket.emit("join", { user_id, group_id, user_name, group_name }, () => {});

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  
  }, [ENDPOINT, group_id]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, user_id, group_id, user_name, () =>
        setMessage("")
      );
    }
  };

  console.log(chat_history);

  return (
    <div className="outerContainer">
      <h1>CHAT ROOM</h1>
      <div className="container">
        <h3> Selected: {group_name} </h3>
        <h3>Previous Messages</h3>
        <div>
        {chat_history.map((message) => (
            <div>
              <strong>{message.user_name}</strong>: {message.message_contents}
            </div>
          ))}
          {messages.map((message) => (
            <div>
              <strong>{message.user_name}</strong>: {message.text}
            </div>
          ))}
        </div>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
}

export default Chat;
