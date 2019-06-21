import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Icon } from "expo";
import firebase from "../../../firebase/firebase";

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
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={() =>
            this.props.currentEvent.organizer.uid ===
            firebase.auth.currentUser.uid
              ? this.props.navigation.navigate("Profile")
              : this.props.navigation.navigate("ProfileView", {
                  user_uid: this.props.currentEvent.organizer.uid
                })
          }
        >
          <Thumbnail
            source={{ uri: this.props.currentEvent.organizer.avatar }}
            style={{ borderRadius: 13, width: 50, height: 50 }}
          />
          <View
            style={{
              flexDirection: "collum",
              marginLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
                fontFamily: "Arial"
              }}
            >
              {this.props.currentEvent.organizer.username.length > 18
                ? this.props.currentEvent.organizer.username.slice(0, 15) +
                  "..."
                : this.props.currentEvent.organizer.username}
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 14,
                fontWeight: "500",
                color: "#1DC161",
                fontFamily: "Arial"
              }}
            >
              Organizer
            </Text>
          </View>
        </TouchableOpacity>
        <Button
          style={{
            height: 50,
            width: 50,
            borderRadius: 13,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.pop()}
        >
          <Icon.Ionicons name="ios-arrow-round-up" size={35} color="black" />
        </Button>
      </View>
    );
  }
}
