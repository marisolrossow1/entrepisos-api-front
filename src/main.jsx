import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { esES } from "@mui/material/locale";
import { UsersProvider } from "./components/contexts/Users.context.jsx";
import { BuildingsProvider } from "./components/contexts/Buildings.context.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001F54",
      light: "#255CB3",
      disabled: "#DCEFFD",
    },
    secondary: {
      main: "#40C4FF",
      light: "#82E9FF",
      disabled: "#CDF7FF",
    },
    info: {
      main: "#40C4FF",
      light: "#82E9FF",
    },
    success: {
      main: "#3ABF68",
      light: "#f2fbf5",
    },
    error: {
      main: "#B00900",
      light: "#ff9892",
    },
    background: {
      default: "#FCFCFC",
    },
    text: {
      default: "#0E0E0E",
    },
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 500,
      fontSize: "2.25rem",
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    body1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
  esES,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UsersProvider> {/* Contexto Usuarios  */}
          <BuildingsProvider> {/* Contexto Edificios */}
            <App />
          </BuildingsProvider>
        </UsersProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
