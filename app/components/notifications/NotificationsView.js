import React from "react";
import { Button, Text } from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase/firebase";

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: "Notifications"
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Notifications Screen</Text>
        <View>
          <Button
            bordered
            style={{ borderColor: "#363A43", marginTop: 15 }}
            // onPress={() => logout(this.props)}
          >
            <Icon
              name="sign-out"
              size={20}
              color={"#363A43"}
              style={{ marginLeft: 10 }}
            />
            <Text style={{ color: "#363A43" }}>View my notifs🎈</Text>
          </Button>
          <Button
            bordered
            style={{ borderColor: "#363A43", marginTop: 15, marginLeft: 10 }}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          >
            <Icon
              name="sign-out"
              size={20}
              color={"#363A43"}
              style={{ marginLeft: 10 }}
            />
            <Text style={{ color: "#363A43" }}>Back Home🏡</Text>
          </Button>
        </View>
      </View>
    );
  }
}
