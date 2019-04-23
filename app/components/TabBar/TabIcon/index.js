import React from "react";
import PropTypes from "prop-types";
import { Icon } from "expo";

const TabIcon = ({ tintColor, iconName }) => (
  <Icon.Feather name={iconName} size={25} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
};

export default TabIcon;
