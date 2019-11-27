import React from "react";
import { screenWidth } from "../../utils/dimensions";
import { Animated, Text } from "react-native";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import HeaderMoreBtn from "./HeaderMoreBtn";

export default class ProfileHeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View
        style={{
          paddingHorizontal: 30,
          top: 45,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: screenWidth,
          opacity: this.props.AnimateOpacity
        }}
      >
        <Button
          style={{
            height: 35,
            width: 35,
            borderRadius: 10,
            backgroundColor: "rgba(255, 255, 255, 0)",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => this.props.navigation.pop()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={30}
            style={{ bottom: 3 }}
            color="white"
          />
        </Button>
        <Text
          style={{
            color: "rgba(255,255,255,1)",
            fontWeight: "600",
            fontSize: 18
          }}
        >
          {this.props.username}
        </Text>
        <HeaderMoreBtn />
      </Animated.View>
    );
  }
}
