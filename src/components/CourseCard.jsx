import { Chip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StarIcon from "@mui/icons-material/Star";

const useCourseCardStyles = makeStyles({
  wrapper: {
    display: "flex",
    marginBottom: 24,
    borderRadius: 4,
    border: "1px solid black",
    cursor: "pointer",
  },
  imageContainer: {
    width: 720,
    height: 320,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: 18,
    width: 720,
  },
  chip: {
    cursor: "pointer",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
});

export const CourseCard = (course) => {
  const classes = useCourseCardStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.imageContainer}>
        <img
          className={classes.previewImage}
          src={`${course.previewImageLink}/cover.webp`}
          alt={course.meta.slug}
        />
      </div>
      <div className={classes.content}>
        <Typography variant="h5">{course.title}</Typography>
        <Typography variant="body2">{course.description}</Typography>
        <Typography>
          <Typography variant="overline" fontWeight="bold">
            Lessons:
          </Typography>
          <Typography variant="overline">{course.lessonsCount}</Typography>
        </Typography>
        <Typography>
          <Typography variant="overline" fontWeight="bold">
            Skills:
          </Typography>
          {course.meta.skills?.map((skill) => (
            <Chip
              className={classes.chip}
              key={skill}
              label={skill}
              size="small"
            />
          ))}
        </Typography>
        <Typography className={classes.rating}>
          <StarIcon color="warning" />
          <Typography variant="overline">{course.rating}</Typography>
        </Typography>
      </div>
    </div>
  );
};
