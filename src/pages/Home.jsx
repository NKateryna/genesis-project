import { Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";
import { services } from "../services";

export const Home = () => {
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
    <>
      <section>
        <Typography variant="h2">Welcome to the course academy!</Typography>
        <Typography variant="body1">We glad to see you there</Typography>
      </section>
      <Button
        disabled={loading}
        variant="contained"
        size="large"
        onClick={authorize}
      >
        <Typography variant="body1">Get started</Typography>
      </Button>
    </>
  );
};
