import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, RouterProvider } from "react-router";
import router from "./routers/router";
import App from "./App.tsx";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d280ff",
    },
    secondary: {
      main: "#5a3199",
    },
    text: {
      primary: "#e2b2dc",
      secondary: "#7a4697",
    },
    background: {
      default: "#190042",
      paper: "#370554",
    },
    error: {
      main: "#bf3a3a",
    },
    warning: {
      main: "#c38427",
      light: "#a46d23",
    },
    info: {
      main: "#268fbd",
    },
    success: {
      main: "#5aa65d",
    },
  },
  typography: {
    fontFamily: "roboto",
    h3: {
      color: "#e2b2dc", // or use palette.text.primary
    },
    body1: {
      color: "#e2b2dc",
    },
    body2: {
      color: "#7a4697", // Secondary body text color
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
