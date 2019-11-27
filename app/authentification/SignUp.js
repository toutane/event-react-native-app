import React from "react";
import { Text, Button } from "native-base";
import { Card } from "../components/Card/styles";
import { Title } from "../components/Title/styles";
import { TextInput } from "../components/TextInput/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../themes";

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
    this.state = {
      username: "",
      email: "",
      bio: "",
      password: "",
      avatar: "",
      usernameInputColor: "rgba(0, 0, 0, 0.1)",
      emailInputColor: "rgba(0, 0, 0, 0.1)",
      bioInputColor: "rgba(0, 0, 0, 0.1)",
      passwordInputColor: "rgba(0, 0, 0, 0.1)",
      error: "null"
    };
  }
  static navigationOptions = {
    header: null
  };

  async onRegister(state, props) {
    var that = this;
    if (state.email && state.username && state.bio && state.password !== "") {
      firebase
        .register(
          state.username,
          state.email,
          state.password,
          state.avatar,
          state.bio
        )
        .catch(error =>
          error.code === "auth/invalid-email"
            ? that.setState({
                emailInputColor: "red",
                error: "email is badly formatted"
              })
            : error.code === "auth/weak-password"
            ? that.setState({
                passwordInputColor: "red",
                error: "password should be at least 6 characters"
              })
            : alert(error.code)
        )
        .then(registed =>
          registed ? props.navigation.navigate("SignIn") : null
        );
    }
    state.email === ""
      ? that.setState({
          emailInputColor: "red",
          error: "you must complete all field !"
        })
      : null;
    state.username === ""
      ? that.setState({
          usernameInputColor: "red",
          error: "you must complete all field !"
        })
      : null;
    state.bio === ""
      ? that.setState({
          bioInputColor: "red",
          error: "you must complete all field !"
        })
      : null;
    state.password === ""
      ? that.setState({
          passwordInputColor: "red",
          error: "you must complete all field !"
        })
      : null;
  }
  // firebase.addBio(state.bio);

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAvoidingView behavior="position" enabled>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
              style={{ height: 60, marginBottom: 20, marginTop: 25 }}
            >
              <Ionicons
                name="ios-arrow-round-back"
                size={60}
                style={{ marginLeft: 30 }}
              />
            </Button>
            <Title>Create Account.</Title>
            <View style={{ marginBottom: 70 }}>
              <Card>
                <TextInput
                  style={{ borderColor: this.state.emailInputColor }}
                  placeholder="email address"
                  autoCapitalize="none"
                  autoFocus={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.usernameInput.focus()}
                  onChangeText={e =>
                    this.setState({
                      email: e,
                      emailInputColor: "rgba(0, 0, 0, 0.1)",
                      error: "null"
                    })
                  }
                />
                <TextInput
                  style={{
                    borderColor: this.state.usernameInputColor,
                    marginTop: 20
                  }}
                  placeholder="username"
                  autoCapitalize="none"
                  autoFocus={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.bioInput.focus()}
                  ref={input => (this.usernameInput = input)}
                  onChangeText={e =>
                    this.setState({
                      username: e,
                      usernameInputColor: "rgba(0, 0, 0, 0.1)",
                      error: "null"
                    })
                  }
                />
                <TextInput
                  style={{
                    borderColor: this.state.bioInputColor,
                    marginTop: 20
                  }}
                  autoCapitalize="none"
                  placeholder="bio"
                  autoFocus={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  ref={input => (this.bioInput = input)}
                  onChangeText={e =>
                    this.setState({
                      bio: e,
                      bioInputColor: "rgba(0, 0, 0, 0.1)",
                      error: "null"
                    })
                  }
                />
                <TextInput
                  style={{
                    borderColor: this.state.passwordInputColor,
                    marginTop: 20
                  }}
                  autoCapitalize="none"
                  placeholder="password"
                  secureTextEntry
                  returnKeyType="go"
                  ref={input => (this.passwordInput = input)}
                  onChangeText={e =>
                    this.setState({
                      password: e,
                      passwordInputColor: "rgba(0, 0, 0, 0.1)",
                      error: "null"
                    })
                  }
                  onSubmitEditing={() =>
                    this.onRegister(this.state, this.props)
                  }
                />
                <LinearGradient
                  colors={[
                    theme.linearGradient.header.from,
                    theme.linearGradient.header.to
                  ]}
                  start={[0, 1]}
                  end={[1, 0]}
                  style={{
                    borderRadius: 14,
                    // height: 50,
                    marginTop: 20,
                    alignItems: "center"
                  }}
                >
                  <Button
                    block
                    onPress={() => this.onRegister(this.state, this.props)}
                    style={{ height: 50, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff"
                      }}
                    >
                      Sign up
                    </Text>
                  </Button>
                </LinearGradient>
              </Card>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color:
                      this.state.error !== "null" ? "red" : "rgba(0, 0, 0, 0)",
                    marginTop: 20
                  }}
                >
                  {this.state.error}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
