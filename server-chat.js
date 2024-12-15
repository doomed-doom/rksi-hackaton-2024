const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const conferences = {};

// Обработка подключения клиента
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("conferences", conferences);

  //Chat
  // Присоединение к комнате
  socket.on("joinRoom", ({ roomID, username, role }) => {
    socket.join(roomID);
    console.log(`User  joined room: ${roomID}`);

    // Отправка сообщения о новом пользователе
    socket
      .to(roomID)
      .emit("message", { user: "admin", text: `${username} has joined!` });
  });

  // Обработка сообщений
  socket.on("sendMessage", ({ roomID, message, username, role }) => {
    io.to(roomID).emit("message", {
      user: username,
      text: message,
      role: role
    }); // Используем имя пользователя, если оно есть
  });

  // Обработка отключения
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Запуск сервера
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
