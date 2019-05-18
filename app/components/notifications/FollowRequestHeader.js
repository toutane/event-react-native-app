import React from "react";
import { View, Text, Animated } from "react-native";
import { Hr } from "../Hr/styles";
import { paddedString } from "uuid-js";

export default class FollowRequestHeader extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Animated.View
        style={{
          zIndex: 99,
          top: this.props.AnimateFollowRequestHeight
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 30,
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35
            // marginLeft: 30,
            // marginRight: 30
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ marginTop: 20, fontSize: 22, fontWeight: "bold" }}>
              Follow Requests
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  height: 7,
                  width: 7,
                  borderRadius: 50,
                  marginRight: 5,
                  backgroundColor: "#1DC161"
                }}
              />
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {this.props.notifications.length}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "white", height: 10 }}>
          <Hr
            style={{
              marginTop: 10,
              marginLeft: 0,
              marginRight: 0
            }}
          />
        </View>
      </Animated.View>
    );
  }
}
