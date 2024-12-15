import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Webcam from "react-webcam";
import axios from "axios";
import "./App.css";

function StartConference() {
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const StartLive = async (e) => {
    const newPath = `/conf/${uuidv4()}`;
    try {
      const notificationUrl = "http://localhost:7270/sendNotification";
      const notificationData = {
        text: `Начался вебинар!\nСмотри быстрее на http://localhost:3000/${newPath}`,
      };

      await axios.post(notificationUrl, notificationData);
       navigate(newPath);
    } catch (err) {
      console.error("Ошибка при создании курса или отправке уведомления:", err);
      setError("Произошла ошибка при создании курса или отправке уведомления.");
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h2 className="text-2xl font-bold mb-1">
        Прекрасно выглядите! Начать вебинар?
      </h2>

      {/* Отображение видео с камеры */}
      <div className="w-150 h-150 mb-8 overflow-hidden rounded-lg shadow-lg">
        <Webcam
          className="w-full h-full object-cover"
          audio={false}
          screenshotFormat="image/jpeg"
        />
      </div>

      {/* Кнопка для начала вебинара */}
      <button
        onClick={StartLive}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        Начать вебинар!
      </button>
    </div>
  );
}

export default StartConference;
