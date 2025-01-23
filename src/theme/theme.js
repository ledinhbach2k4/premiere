import { createTheme } from "@mui/material/styles";
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
export default theme;