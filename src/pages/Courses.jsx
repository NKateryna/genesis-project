import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CoursesList } from "../components";

const useCoursesStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "100vh",
    background:
      "linear-gradient(320deg, #9effd5 0%, #ebebff 35%, #9beeff 100%)",
    padding: 48,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: 24,
    },
  },
  header: {
    paddingBottom: 24,
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem !important",
      textAlign: "center",
    },
  },
}));

export const Courses = () => {
  const classes = useCoursesStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.header}>
        Explore the learnings
      </Typography>
      <CoursesList />
    </div>
  );
};
