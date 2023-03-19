import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";
import { services } from "../services";

const useHomeStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    background:
      "linear-gradient(320deg, #01ff92 0%, #090979 35%, #00d4ff 100%)",
  },
  modal: {
    width: 720,
    height: 200,
    padding: 24,
    borderRadius: 12,
    background: "#efefef",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: 480,
      height: 150,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem !important",
    },
  },
}));

export const Home = () => {
  const classes = useHomeStyles();
  const [loading, setLoading] = useState(false);
  const [, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const authorize = async () => {
    setLoading(true);
    const token = await services.auth.anonymousLogin();

    setAuth(token);
    setLoading(false);
    navigate("/courses");
  };

  return (
    <div className={classes.root}>
      <section className={classes.modal}>
        <p>
          <Typography classes={{ root: classes.title }} variant="h2">
            Welcome to the course
          </Typography>
          <Typography variant="body1">We glad to see you there</Typography>
        </p>
        <Button
          disabled={loading}
          variant="contained"
          size="large"
          onClick={authorize}
        >
          <Typography variant="body1">Get started</Typography>
        </Button>
      </section>
    </div>
  );
};
