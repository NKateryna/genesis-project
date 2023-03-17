import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../contexts";
import { services } from "../services";
import { LessonsList, VideoPlayer } from "../components";
import { StorageHandler } from "../utils";

export const Course = () => {
  const [token] = useContext(AuthContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const data = await services.courses.getCourseById(courseId, token);

      setCourse(data);
      setActiveLesson(data.lessons[0]);

      if (StorageHandler.getCourseProgress(data.id) === null) {
        StorageHandler.setInitialCourseProgress(
          data.id,
          data.lessons[0].id,
          data.lessons.length
        );
      }
      setLoading(false);
    };

    fetchCourse();
    // eslint-disable-next-line
  }, [courseId, token]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!course) {
    return <p>Not found</p>;
  }

  return (
    <>
      {/* {JSON.stringify(course)} */}
      <Link to="/courses">
        <ArrowBackIcon />
        Back
      </Link>
      <Typography variant="h2">{course.title}</Typography>
      <Typography variant="body2">{course.description}</Typography>
      {activeLesson && (
        <VideoPlayer
          id={activeLesson.id}
          title={activeLesson.title}
          url={activeLesson.link}
        />
      )}
      <LessonsList
        lessons={course.lessons.filter(
          (lesson) => lesson.id !== activeLesson.id
        )}
        setActiveLesson={setActiveLesson}
        cover={`${course.previewImageLink}/cover.webp`}
      />
    </>
  );
};
