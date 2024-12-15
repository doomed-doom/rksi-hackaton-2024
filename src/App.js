import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartConference from "./StartConference";
import Conference from "./Conference";
import "./App.css";
import TeacherForm from "./TeacherLogin";
import AddCourse from "./AddCourse";
import CreateProject from "./CreateProject";
import Dashboard from "./Teacher";
import CourseDetail from "./CourseDetail";
import EditCourse from "./EditCourse";
import CourseList from "./CourseList";
import TeacherCourseList from "./TeacherCourseList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/conf/:id" element={<Conference />} />
          <Route path="/teacher/login" element={<TeacherForm />} />
          <Route path="/courses" element={<CourseList />} />

          <Route path="/courses/:id" exact element={<CourseDetail />} />

          <Route path="/teacher" element={<Dashboard />}>
            <Route path="/teacher/courses" element={<TeacherCourseList />} />
            <Route path="/teacher/add" element={<AddCourse />} />
            <Route path="/teacher/courses/:id/edit" element={<EditCourse />} />
            <Route path="/teacher/create-project" element={<CreateProject />} />
            <Route path="/teacher/conf" element={<StartConference />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
