import { Alert, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useLessonListStyles = makeStyles({
  lessonBackground: {
    width: 120,
    height: 100,
    objectFit: "cover",
  },
  lessonContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
    cursor: "pointer",
    border: "1px solid #000",
  },
  lessonTitle: {
    paddingLeft: 24,
  },
});

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

  const handleLessonClick = (lesson) => {
    if (lesson.status !== "locked") {
      setActiveLesson(lesson);
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
