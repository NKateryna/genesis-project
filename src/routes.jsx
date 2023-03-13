import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Course, Courses, Home } from "./pages";

export const RootRoute = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/course/:courseId' element={<Course />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
};