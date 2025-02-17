import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import { Ionicons, Feather } from "@expo/vector-icons";

export default class EditHeader extends React.Component {
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
          Edit profile
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
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Ionicons name="ios-close" size={35} color="black" />
        </Button>
        {this.props.canUpdate ? (
          <Button
            style={{
              height: 50,
              width: 50,
              borderRadius: 13,
              backgroundColor: "#1DC161",
              justifyContent: "center"
            }}
            onPress={() => this.props.updateProfile()}
          >
            <Feather name="check" size={25} color="white" />
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
            <Feather name="check" size={25} color="black" />
          </Button>
        )}
      </View>
    );
  }
}
