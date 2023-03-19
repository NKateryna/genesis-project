import { Alert, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StorageHandler } from "../utils";

const useLessonListStyles = makeStyles((theme) => ({
  lessonBackground: {
    width: 120,
    height: 100,
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 180,
    },
  },
  lessonContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
    cursor: "pointer",
    border: "1px solid #000",
    borderRadius: 12,
    overflow: "hidden",
    width: 720,
    background: "#efefef",
    "&:last-child": {
      marginBottom: 0,
    },
    [theme.breakpoints.down("md")]: {
      width: 480,
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      flexDirection: "column",
    },
  },
  lessonTitle: {
    paddingLeft: 24,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      padding: "12px 0",
    },
  },
}));

const getBackground = (lesson, cover) => {
  if (lesson.status === "locked") {
    return "https://img.freepik.com/premium-vector/bronze-lock-icon-white-background-flat-design-illustration-stock-vector-graphics_668389-92.jpg?w=2000";
  }

  // return `${lesson.previewImageLink}/${lesson.order}.webp`;
  return cover;
};

// cover is used temporary to replace non-working lessons thumbnail with course cover
export const LessonsList = ({ lessons, setActiveLesson, cover }) => {
  const classes = useLessonListStyles();
  const [open, setOpen] = useState(false);
  const { courseId } = useParams();

  const handleLessonClick = (lesson) => {
    if (lesson.status !== "locked") {
      setActiveLesson(lesson);
      StorageHandler.updateCourseProgress(
        courseId,
        lessons.length + 1,
        lesson.id
      );
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <Typography variant="h6">Check out other lessons:</Typography>
      <ul>
        {lessons.map((lesson) => (
          <li
            className={classes.lessonContainer}
            key={lesson.id}
            onClick={() => handleLessonClick(lesson)}
          >
            <img
              className={classes.lessonBackground}
              src={getBackground(lesson, cover)}
              alt={lesson.title}
            ></img>
            <Typography className={classes.lessonTitle} variant="body1">
              {lesson.title}
            </Typography>
          </li>
        ))}
      </ul>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          This lesson is locked!
        </Alert>
      </Snackbar>
    </>
  );
};
