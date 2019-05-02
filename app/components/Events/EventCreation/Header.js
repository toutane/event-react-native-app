import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import { Icon } from "expo";

export default class Header extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 8,
            color: "black"
          }}
        >
          New event
        </Text>
        <Button
          style={{
            height: 50,
            width: 50,
            borderRadius: 13,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Icon.Ionicons name="ios-arrow-round-up" size={35} color="black" />
        </Button>
      </View>
    );
  }
}
