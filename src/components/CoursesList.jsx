import { CircularProgress, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CourseCard } from ".";
import { AuthContext } from "../contexts";
import { services } from "../services";

export const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { courses, total } = await services.courses.getCourses(
        auth,
        page,
        limit
      );
      setCourses(courses);
      setTotal(total);
      setLoading(false);
    };

    fetchCourses();
  }, [auth, page]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
      <Pagination
        count={Math.ceil(total / limit) || 1}
        page={page}
        onChange={(e, page) => setPage(page - 1)}
        disabled={total === 0}
        shape="rounded"
        size="large"
      />
    </>
  );
};
