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
            marginLeft: 45,
            borderRadius: 13,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Icon.Ionicons name="ios-close" size={35} color="black" />
        </Button>
        {this.props.title !== "" ? (
          <Button
            style={{
              height: 50,
              width: 50,
              borderRadius: 13,
              backgroundColor: "#1DC161",
              justifyContent: "center"
            }}
            onPress={() => this.props.createNewEvent()}
          >
            <Icon.Feather name="check" size={25} color="white" />
          </Button>
        ) : (
          <Button
            style={{
              height: 50,
              width: 50,
              borderRadius: 13,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              justifyContent: "center"
            }}
          >
            <Icon.Feather name="check" size={25} color="black" />
          </Button>
        )}
      </View>
    );
  }
}
