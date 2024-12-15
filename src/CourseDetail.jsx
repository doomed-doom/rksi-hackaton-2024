import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5020/api/courses/${id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{course.name}</h1>
      <p className="text-gray-700 mb-4">
        <strong>
          <span className="text-black-700">Описание курса: </span>
        </strong>
        {course.description}
      </p>
      <p className="text-black-700 mb-4">
        <strong>Текст курса: </strong>
      </p>
      <pre className="markdown-content font-bold">
        <div className="markdown-content">
          <ReactMarkdown>{course.text}</ReactMarkdown>
        </div>
      </pre>
    </div>
  );
};

export default CourseDetail;
