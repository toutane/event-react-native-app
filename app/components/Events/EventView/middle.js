import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import { Icon } from "expo";

import { screenWidth } from "../../../utils/dimensions";

export default class Middle extends React.Component {
  render() {
    return (
      <View style={{ paddingHorizontal: 25, marginBottom: 30 }}>
        <Text style={styles.mainTitle}>
          {this.props.currentEvent.event.title}
        </Text>
        <Text style={styles.subTitle}>
          {this.props.currentEvent.event.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 30,
    fontSize: 45,
    fontWeight: "bold",
    color: "black"
  },
  subTitle: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 27,
    color: "black",
    fontFamily: "Arial"
  }
});
