import { ThemeProvider } from "@mui/material/styles";
import { RootRoute } from "./routes";
import { theme } from "./theme";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <RootRoute />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
