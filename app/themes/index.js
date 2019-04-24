import React from "react";

import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    white: "#FFFFFF",
    grey: "#EBEDF0",
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
    // headerMessage: {
    //   from: "#E55A34",
    //   to: "#EC7034"
    // }
  },
  tabColors: {
    home: {
      active: "rgba(80, 108, 242, 1)",
      background: "rgba(80, 108, 242, 0.1)"
    },
    message: {
      active: "rgba(80, 108, 242, 1)",
      background: "rgba(80, 108, 242, 0.1)"
    },
    profile: {
      active: "rgba(80, 108, 242, 1)",
      background: "rgba(80, 108, 242, 0.1)"
    },
    settings: {
      active: "rgba(254 , 35, 93, 1)",
      background: "rgba(254 , 35, 93, 0.1)"
    }
  }
};

export default props => <ThemeProvider theme={theme} {...props} />;
