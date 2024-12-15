import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import FloatButton from "./components/float-button/float-button";
import MainContent from "./components/main-content/main-content";
import Projects from "./components/projects/projects";
import Registration from './components/registration/registration'
import Login from "./components/login/login";
import NotFound from "./components/not-found/not-found";
import Vacancy from "./components/vacancy/vacancy";
import MobileNavbar from "./components/mobile-navbar/mobile-navbar";
import { useState } from "react";
import MobileMenu from "./components/mobile-menu/mobile-menu";
import MainPage from "./components/main-page/main-page";
import Account from "./components/account/account";
import TeacherForm from "./TeacherLogin";
import AddCourse from "./AddCourse";
import CreateProject from "./CreateProject";
import Dashboard from "./Teacher";
import CourseDetail from "./CourseDetail";
import EditCourse from "./EditCourse";
import CourseList from "./CourseList";
import TeacherCourseList from "./TeacherCourseList";
import StartConference from "./StartConference";
import Conference from "./Conference";

function App() {
  const userToken =  localStorage.getItem('userToken');
        console.log(userToken);
  
  // var isLogIn = userToken != undefined;

  var isLogIn = true;

  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
     <Router>
      <Header isLogedIn={isLogIn} />
      <Routes>
        <Route path="*" element={<MainContent><NotFound/></MainContent>}/>
        <Route path="/" element={<MainContent><MainPage/></MainContent>}/>
        <Route path="/account" element={<MainContent><Account/></MainContent>}/>
        <Route path="/projects" element={<MainContent><Projects/></MainContent>} />
        <Route path="/registration" element={<MainContent><Registration/></MainContent>} />
        <Route path="/login" element={<MainContent><Login/></MainContent>} />
        <Route path="/vacancy" element={<MainContent><Vacancy/></MainContent>} />
        <Route path="/conf/:id" element={<MainContent><Conference /></MainContent>} />
        <Route path="/teacher/login" element={<MainContent><TeacherForm /></MainContent>} />
        <Route path="/courses" element={<MainContent><CourseList /></MainContent>} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/teacher" element={<MainContent><Dashboard /></MainContent>}/>
        <Route path="/teacher/courses" element={<TeacherCourseList />} />
        <Route path="/teacher/add" element={<AddCourse />} />
        <Route path="/teacher/courses/:id/edit" element={<EditCourse />} />
        <Route path="/teacher/create-project" element={<MainContent><CreateProject /></MainContent>} />
        <Route path="/teacher/conf" element={<MainContent><StartConference /></MainContent>} />
      </Routes>
      {/* <FloatButton /> */}
      <MobileNavbar isMenuActive={isMenuActive}  toggleMenu={toggleMenu}/>
      <MobileMenu isMenuActive={isMenuActive} toggleMenu={toggleMenu} />
     </Router>
    </>
  );
}

export default App;