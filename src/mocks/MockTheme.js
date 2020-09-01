import React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "../shared/Theme";

const MockTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MockTheme;
