import React from "react";
import { View, Text } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Icon } from "expo";
import firebase from "../../../firebase/firebase";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "default"
    };
  }
  componentDidMount() {
    firebase
      .getCurrentUserAvatar()
      .then(avatar => this.setState({ avatar: avatar }));
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {this.state.isLoading ? null : (
            <Thumbnail
              source={{ uri: this.state.avatar }}
              style={{ borderRadius: 13, width: 50, height: 50 }}
            />
          )}
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
              {firebase.auth.currentUser.displayName}
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
        </View>
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
