import { ThemeProvider } from "@mui/material/styles";
import { RootRoute } from "./routes";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootRoute />
    </ThemeProvider>
  );
}

export default App;
