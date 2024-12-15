import React from "react";
import { Outlet, Link } from "react-router-dom";
import './def.css'

const Teacher = () => {
  return (
    <div className="baze flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-64 shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Teacher Panel</h2>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <Link
                to="/teacher/conf"
                className="block py-2 px-4 text-sm text-gray-700"
              >
                Начать вебинар
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/teacher/courses"
                className="block py-2 px-4 text-sm text-gray-700"
              >
                Управление курсами
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/teacher/create-project"
                className="block py-2 px-4 text-sm text-gray-700"
              >
                Управление проектами
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
