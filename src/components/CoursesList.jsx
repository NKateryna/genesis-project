import { Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { CourseCard, Loader } from ".";
import { AuthContext } from "../contexts";
import { services } from "../services";

const useCoursesListStyles = makeStyles({
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 24,
  },
  pagination: {
    justifyContent: "center",
  },
});

export const CoursesList = () => {
  const classes = useCoursesListStyles();

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
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
    return <Loader />;
  }

  return (
    <>
      <div className={classes.list}>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      <Pagination
        classes={{ ul: classes.pagination }}
        count={Math.ceil(total / limit) || 1}
        page={page}
        onChange={(e, page) => setPage(page)}
        disabled={total === 0}
        shape="rounded"
        size="large"
      />
    </>
  );
};
