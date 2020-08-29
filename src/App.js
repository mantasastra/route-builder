import React from "react";
import { ThemeProvider } from "emotion-theming";

import theme from "./shared/Theme";
import RouteBuilder from "./pages/RouteBuilder";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouteBuilder />
      </ThemeProvider>
    </div>
  );
}

export default App;
