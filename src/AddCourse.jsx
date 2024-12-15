import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseText, setCourseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Создание курса
      await axios.post("http://localhost:5020/api/courses", {
        name: courseName,
        description: courseDescription,
        text: courseText,
      });

      // Отправка уведомления
      const notificationUrl = "http://localhost:7270/sendNotification";
      const notificationData = {
        text: "Вышел новый курс!\nЧитай быстрее на http://localhost:3000/courses",
      };

      await axios.post(notificationUrl, notificationData);

      // Переход на страницу со списком курсов
      navigate("/courses");
    } catch (err) {
      console.error("Ошибка при создании курса или отправке уведомления:", err);
      setError("Произошла ошибка при создании курса или отправке уведомления.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Форма создания курса
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
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700"
          >
            Название курса:
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="courseDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Описание курса:
          </label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="courseText"
            className="block text-sm font-medium text-gray-700"
          >
            Текст курса:
          </label>
          <textarea
            id="courseText"
            value={courseText}
            onChange={(e) => setCourseText(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="6"
          />
        </div>
        <FileUpload onUpload={(text) => setCourseText(text)} />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
