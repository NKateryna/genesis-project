import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactHlsPlayer from "react-hls-player";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../contexts";
import { services } from "../services";
import { LessonsList } from "../components";

const useCourseStyles = makeStyles({
  player: {
    width: 720,
    height: "auto",
  },
  videoContainer: {
    display: "flex",
  },
});

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
      <div className={classes.videoContainer}>
        {/*
        activeLesson.link should be used instead inside the source, but CORS error is appearing due to server not configured properly
      */}
        <ReactHlsPlayer
          src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
          autoPlay={false}
          controls={true}
          className={classes.player}
        />
        <Typography variant="h4">{activeLesson.title}</Typography>
      </div>
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
