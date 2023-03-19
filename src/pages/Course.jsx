import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../contexts";
import { services } from "../services";
import { LessonsList, Loader, VideoPlayer } from "../components";
import { StorageHandler } from "../utils";

const useCourseStyles = makeStyles((theme) => ({
  container: {
    background:
      "linear-gradient(320deg, #9effd5 0%, #ebebff 35%, #9beeff 100%)",
    padding: 48,
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      padding: 24,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  back: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    marginRight: "auto",
    color: "#004f97",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  heading: {
    maxWidth: 720,
    marginBottom: 24,
    "&>h2": {
      [theme.breakpoints.down("md")]: {
        fontSize: "2rem !important",
      },
    },
  },
}));

export const Course = () => {
  const classes = useCourseStyles();
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
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  if (!course) {
    return <p>Not found</p>;
  }

  return (
    <div className={classes.container}>
      <Link to="/courses" className={classes.back}>
        <ArrowBackIcon />
        Back
      </Link>
      <p className={classes.heading}>
        <Typography variant="h2">{course.title}</Typography>
        <Typography variant="body2">{course.description}</Typography>
      </p>
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
    </div>
  );
};
