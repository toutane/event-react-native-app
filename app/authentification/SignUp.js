import React from "react";
import { Text, Button } from "native-base";
import { Card } from "../components/Card/styles";
import { Title } from "../components/Title/styles";
import { TextInput } from "../components/TextInput/styles";
import { Icon } from "expo";

// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import firebase from "../firebase/firebase";

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", bio: "", password: "", avatar: "" };
  }
  static navigationOptions = {
    header: null
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAvoidingView behavior="position" enabled>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
              style={{ height: 60, marginBottom: 20, marginTop: 25 }}
            >
              <Icon.Ionicons
                name="ios-arrow-round-back"
                size={60}
                style={{ marginLeft: 30 }}
              />
            </Button>
            <Title>Create Account.</Title>
            <Card style={{ marginBottom: 100 }}>
              <TextInput
                placeholder="email address"
                autoFocus={false}
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={() => this.usernameInput.focus()}
                onChangeText={e => this.setState({ email: e })}
              />
              <TextInput
                placeholder="username"
                style={{ marginTop: 20 }}
                autoFocus={false}
                returnKeyType="next"
                onSubmitEditing={() => this.bioInput.focus()}
                ref={input => (this.usernameInput = input)}
                onChangeText={e => this.setState({ username: e })}
              />
              <TextInput
                placeholder="bio"
                style={{ marginTop: 20 }}
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
                style={{ marginTop: 20 }}
                ref={input => (this.passwordInput = input)}
                onChangeText={e => this.setState({ password: e })}
                onSubmitEditing={() => onRegister(this.state, this.props)}
              />
              <Button
                block
                onPress={() => onRegister(this.state, this.props)}
                style={{
                  backgroundColor: "#fd6735",
                  borderRadius: 14,
                  height: 50,
                  marginTop: 20,
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Sign up
                </Text>
              </Button>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
