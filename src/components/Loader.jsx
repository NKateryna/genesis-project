import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useLoaderStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

export const Loader = () => {
  const classes = useLoaderStyles();
  return <CircularProgress className={classes.root} />;
};
