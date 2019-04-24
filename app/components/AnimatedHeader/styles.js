import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo";
import { theme } from "../../themes";

export default class HeaderGradient extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient
          colors={[this.props.headerFrom, this.props.headerTo]}
          start={[1, 1]}
          end={[1, 0]}
          style={{
            borderRadius: 35,
            height: "100%",
            width: this.props.width
          }}
        />
      </View>
    );
  }
}
