// src/Chat.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css"; // Импортируем CSS файл

const socket = io("http://localhost:4000/");

const Chat = () => {
  const { roomID } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("egprog"); 
  const [role, setRole] = useState("student");

  useEffect(() => {
    socket.emit("joinRoom", { roomID, username, role });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, [roomID]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && username) {
      socket.emit("sendMessage", { roomID, message, username, role }); // Отправляем имя пользователя вместе с сообщением
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chat Room: {roomID}</h1>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user} ({msg.role}): </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
