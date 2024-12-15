import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "./Chat";

import io from "socket.io-client";


const socket = io("http://localhost:4000/");
function Conference() {
  const [isOpen, setIsOpen] = useState(false)
    let { id } = useParams()
  let path = `http://localhost:9999/index.html?room=${id}`
  
  const roomID = id;
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
    <div className="StartConference">
      <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <iframe
          src={path}
          width="100%"
          height="90%"
          style={{ border: "none" }}
          allow="camera; microphone"
        />
      </div>
      <div className="help">
        <div
          className="text-white text-sm font-bold py-1 px-3 mt-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Закрыть чат" : "Открыть чат"}
        </div>
      </div>

      {isOpen && (
        <div className="chat">
          <div className="chat-container">
            <h1 className="chat-header">Чат</h1>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <strong>
                    {msg.user} ({msg.role}):{" "}
                  </strong>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Нажимайте на кнопочки..."
                required
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conference;
