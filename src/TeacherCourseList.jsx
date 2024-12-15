import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherCourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для поиска

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("http://localhost:5020/api/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    navigate(`/teacher/courses/${courseId}/edit`);
  };

  const handleView = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5020/api/courses/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Ошибка при удалении курса:", error);
    }
  };

  // Фильтрация курсов на основе searchTerm
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Управление курсами</h1>

      {/* Поле для поиска */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск по названию курса"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Список курсов */}
      <ul className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li key={course._id} className="border p-4 rounded-md">
              <div className="text-blue-500 font-bold">
                {course.name}
                <br />
                <br />
                <small className="text-black font-bold">
                  {course.description}
                </small>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(course._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-1 rounded"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleView(course._id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-1 rounded"
                >
                  Просмотр
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-1 rounded"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Ничего не найдено. Попробуйте другой запрос.
          </p>
        )}
      </ul>

      {/* Кнопка "Создать новый курс" */}
      <div className="flex justify-left">
        <button
          onClick={() => navigate("/teacher/add")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold py-1 px-3 mt-8 rounded"
        >
          Создать новый курс
        </button>
      </div>
    </div>
  );
};

export default TeacherCourseList;
