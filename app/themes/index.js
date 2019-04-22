import React from "react";

import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#333333",
    blue: "#506CF2"
  },
  linearGradient: {
    header: {
      from: "#2B4CF2",
      to: "#506CF2"
    }
  }
};

// export default props => <ThemeProvider theme={theme} {...props} />;
