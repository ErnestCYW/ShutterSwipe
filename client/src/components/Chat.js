import React, { Fragment, useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function Chat({ group_id, user_id }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    if (group_id != "No Chat Selected") {
      socket = io(ENDPOINT);
      socket.emit("join", { user_id, group_id }, () => {});

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    }
  }, [ENDPOINT, group_id]);

  useEffect(() => {
    if (group_id != "No Chat Selected") {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [group_id]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, user_id, group_id, () =>
        setMessage("")
      );
    }
  };

  return (
    <div className="outerContainer">
      <h1>CHAT ROOM</h1>
      <div className="container">
        <h3> Selected: {group_id} </h3>
        <h3>Previous Messages</h3>
        <div>
          {messages.map((message) => (
            <div>
              <strong>{message.user}</strong>: {message.text}
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
