import { Navigate, Route, Routes } from "react-router-dom";
import { Course, Courses, Home } from "./pages";

export const RootRoute = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:courseId" element={<Course />} />
    <Route path="/*" element={<Navigate to="/" replace />} />
  </Routes>
);
