import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("authToken"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
