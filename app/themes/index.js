import React from "react";

import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#333333",
    inactiveColor: "#262626",
    border: "#cbe8d7",

    blue: "#506CF2"
  },
  linearGradient: {
    header: {
      from: "#2B4CF2",
      to: "#506CF2"
    }
  },
  tabColors: {
    home: {
      active: "rgba(244, 195, 0, 1)",
      background: "rgba(244, 195, 0, 0.1)"
    },
    search: {
      active: "rgba(64, 234, 135, 1)",
      background: "rgba(64, 234, 135, 0.1)"
    },
    profile: {
      active: "rgba(208, 115, 255, 1)",
      background: "rgba(208, 115, 255, 0.1)"
    },
    settings: {
      active: "rgba(235, 92, 110, 1)",
      background: "rgba(235, 92, 110, 0.1)"
    }
  }
};

export default props => <ThemeProvider theme={theme} {...props} />;
