import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './def.css'

const Addproject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectText, setProjectText] = useState("");
  const [selectedTool, setSelectedTool] = useState(null); // Состояние для выбранного инструмента
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToolChange = (tool) => {
    setSelectedTool(tool); // Устанавливаем выбранный инструмент
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Создание проекта
      await axios.post("http://localhost:5020/api/projects", {
        name: projectName,
        description: projectDescription,
        text: projectText,
        tool: selectedTool, // Добавляем выбранный инструмент
      });

      // Отправка уведомления
      const notificationUrl = "http://localhost:7270/sendNotification";
      const notificationData = {
        text: "Вышел новый проект!\nЧитай быстрее на http://localhost:3000/projects",
      };

      await axios.post(notificationUrl, notificationData);

      // Переход на страницу со списком проектов
      navigate("/projects");
    } catch (err) {
      console.error(
        "Ошибка при создании проекта или отправке уведомления:",
        err
      );
      setError(
        "Произошла ошибка при создании проекта или отправке уведомления."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="baze max-w-md mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Форма создания проекта
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Название проекта:
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="projectDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Описание проекта:
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="projectText"
            className="block text-sm font-medium text-gray-700"
          >
            Цель проекта:
          </label>
          <textarea
            id="projectText"
            value={projectText}
            onChange={(e) => setProjectText(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Инструмент выполнения проекта:
          </label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tool1"
                checked={selectedTool === "tool1"}
                onChange={() => handleToolChange("tool1")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <label
                htmlFor="tool1"
                className="ml-2 block text-sm text-gray-900"
              >
                Инструмент 1
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tool2"
                checked={selectedTool === "tool2"}
                onChange={() => handleToolChange("tool2")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <label
                htmlFor="tool2"
                className="ml-2 block text-sm text-gray-900"
              >
                Инструмент 2
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tool3"
                checked={selectedTool === "tool3"}
                onChange={() => handleToolChange("tool3")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <label
                htmlFor="tool3"
                className="ml-2 block text-sm text-gray-900"
              >
                Инструмент 3
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-black bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
    </div>
  );
};

export default Addproject;
