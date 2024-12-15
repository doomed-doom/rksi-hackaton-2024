import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/upload",
        formData
      );
      onUpload(response.data.text); // Передаем текст курса в родительский компонент
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
      alert("Ошибка при загрузке файла");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить файл</button>
    </div>
  );
};

export default FileUpload;
