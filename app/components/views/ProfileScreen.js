import React from "react";
import { Button, Text } from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase/firebase";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    async function logout(props) {
      await firebase.logout();
      props.navigation.navigate("SignIn");
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Profile Screen</Text>
        <View>
          <Button
            bordered
            style={{ borderColor: "#363A43", marginTop: 15 }}
            onPress={() => logout(this.props)}
          >
            <Icon
              name="sign-out"
              size={20}
              color={"#363A43"}
              style={{ marginLeft: 10 }}
            />
            <Text style={{ color: "#363A43" }}>Logout</Text>
          </Button>
        </View>
      </View>
    );
  }
}
