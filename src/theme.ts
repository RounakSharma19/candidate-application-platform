import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#EDF1F6",
    },

    text: {
      primary: "#343a40",
      disabled: "#7b809a",
    },

    primary: {
      main: "#25476A",
      light: "#fff",
    },

    secondary: {
      main: "#01A9F4",
    },

    info: {
      main: "#AB47BC",
    },

    success: {
      main: "#139c29",
    },

    warning: {
      main: "#FA9F1A",
    },

    error: {
      main: "#DF5645",
    },

    grey: {
      100: "#f8f9fa",
      200: "#f0f2f5",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
  },
  typography: {
    h1: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      lineHeight: "2.25rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, div#root, main": {
          height: "100%",
        },

        /* width */
        "::-webkit-scrollbar": {
          width: 6,
          height: 6,
        },

        /* Track */
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },

        /* Handle */
        "::-webkit-scrollbar-thumb": {
          background: "#888",
        },

        /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      },
    },
  },
});
theme = createTheme(theme, {
  mixins: {
    toolbar: {
      minHeight: 64,

      [theme.breakpoints.up("sm")]: {
        minHeight: 64,
      },

      [`${theme.breakpoints.up("xs")} (orientation: landscape)`]: {
        minHeight: 64,
      },
    },
  },
});

export default theme;
