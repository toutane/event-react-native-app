import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Thumbnail, Badge, Button } from "native-base";
import { screenWidth } from "../../../utils/dimensions";

export default class MiddleView extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={{ backgroundColor: "#158E47" }}>
        <View style={styles.headerBox}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              The particpants{" "}
              <Text
                style={{ fontSize: 16, color: "#797979", fontWeight: "500" }}
              >
                (
                {1 +
                  this.props.currentEvent.participants.filter(
                    part => part.state === "available"
                  ).length}
                /{1 + this.props.currentEvent.participants.length})
              </Text>
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View>
                <Thumbnail
                  source={{ uri: this.props.currentEvent.organizer.avatar }}
                  style={{
                    borderRadius: 13,
                    width: 45,
                    height: 45
                  }}
                />
                <Badge
                  primary
                  style={{
                    backgroundColor: "#1DC161",
                    position: "absolute",
                    top: 35,
                    right: -4,
                    width: 10,
                    height: 12
                  }}
                />
              </View>
              {this.props.currentEvent.participants
                .filter(part => part.state === "available")
                .slice(0, 3)
                .map((participants, i) => (
                  <Thumbnail
                    key={i}
                    source={{ uri: participants.avatar }}
                    style={{
                      borderRadius: 13,
                      width: 45,
                      height: 45,
                      marginLeft: 8
                    }}
                  />
                ))}
              {this.props.currentEvent.participants.filter(
                part => part.state === "available"
              ).length > 4 ? (
                <View
                  style={{
                    borderRadius: 13,
                    backgroundColor: "#F9F0DB",
                    marginLeft: 10,
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#fead01",
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    +
                    {this.props.currentEvent.participants.filter(
                      part => part.state === "available"
                    ).length - 3}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: screenWidth,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white"
  }
});
