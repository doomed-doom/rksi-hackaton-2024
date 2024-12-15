import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseText, setCourseText] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5020/api/courses/${id}`);
      setCourseName(res.data.name);
      setCourseDescription(res.data.description);
      setCourseText(res.data.text);
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5020/api/courses/${id}`, {
        name: courseName,
        description: courseDescription,
        text: courseText,
      });
    } catch (error) {
      console.error("Ошибка при обновлении курса:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Редактирование курса
      </h1>
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
