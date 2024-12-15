import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("http://localhost:5020/api/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  // Фильтрация курсов на основе searchTerm
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Список курсов</h1>

      {/* Поле для поиска */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск по названию курса"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Список курсов */}
      <ul className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li key={course._id} className="border p-4 rounded-md">
              <Link
                to={`/courses/${course._id}`}
                className="text-blue-500 hover:underline font-bold"
              >
                {course.name}
                <br />
                <br />
                <small className="text-black font-bold">
                  {course.description}
                </small>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Ничего не найдено. Попробуйте другой запрос.
          </p>
        )}
      </ul>
    </div>
  );
};

export default CourseList;
