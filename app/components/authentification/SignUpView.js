import React from "react";
import { Text, Button } from "native-base";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase/firebase";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", bio: "", password: "", avatar: "" };
  }
  static navigationOptions = {
    title: "SignUp"
  };

  render() {
    async function onRegister(state, props) {
      try {
        await firebase.register(
          state.username,
          state.email,
          state.password,
          state.avatar
        );
        await firebase.addBio(state.bio);
        props.navigation.navigate("SignIn");
      } catch (error) {
        alert(error.message);
      }
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <KeyboardAvoidingView behavior="position" enabled>
            <Text
              style={{
                fontSize: 45,
                marginTop: 100,
                marginBottom: 10,
                marginLeft: 10
              }}
            >
              Sign <Text style={{ color: "#0984e3", fontSize: 45 }}>up</Text>
            </Text>
            <TextInput
              placeholder="email address"
              style={styles.textInput}
              autoFocus={false}
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => this.usernameInput.focus()}
              onChangeText={e => this.setState({ email: e })}
            />
            <TextInput
              placeholder="username"
              style={styles.textInput}
              autoFocus={false}
              returnKeyType="next"
              onSubmitEditing={() => this.bioInput.focus()}
              ref={input => (this.usernameInput = input)}
              onChangeText={e => this.setState({ username: e })}
            />
            <TextInput
              placeholder="bio"
              style={styles.textInput}
              autoFocus={false}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={input => (this.bioInput = input)}
              onChangeText={e => this.setState({ bio: e })}
            />
            <TextInput
              placeholder="password"
              secureTextEntry
              returnKeyType="go"
              style={styles.textInput}
              ref={input => (this.passwordInput = input)}
              onChangeText={e => this.setState({ password: e })}
              onSubmitEditing={() => onRegister(this.state, this.props)}
            />
            {/* <Button
              bordered
              style={{
                borderColor: "#363A43",
                marginTop: 10,
                marginRight: 35,
                marginLeft: 10
              }}
              onPress={this.onImageUpload}
            >
              <Text>Upload avatar</Text>
            </Button> */}
            <View style={{ flexDirection: "row" }}>
              <Button
                bordered
                onPress={() => this.props.navigation.navigate("SignIn")}
                style={{
                  borderColor: "#363A43",
                  marginTop: 20,
                  marginRight: 35,
                  marginLeft: 10
                }}
              >
                <Icon
                  name="sign-in"
                  size={20}
                  color={"#363A43"}
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ color: "#363A43" }}>Sign in</Text>
              </Button>
              <Button
                bordered
                onPress={() => onRegister(this.state, this.props)}
                style={{
                  borderColor: "#363A43",
                  marginTop: 20
                }}
              >
                <Icon
                  name="user-plus"
                  size={20}
                  color={"#0984e3"}
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ color: "#363A43" }}>Sign up</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    height: 34,
    width: 270,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "rgba(54,58,67,1)",
    borderWidth: 1,
    fontSize: 16
  }
});
