import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

const TabIcon = ({ tintColor, iconName }) => (
  <Feather name={iconName} size={25} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
};

export default TabIcon;
