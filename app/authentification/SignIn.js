import React from "react";
import { Text, Button } from "native-base";
import { Card } from "../components/Card/styles";
import { Title } from "../components/Title/styles";
import { TextInput } from "../components/TextInput/styles";
import { Hr } from "../components/Hr/styles";
import { Icon, LinearGradient } from "expo";

import { theme } from "../themes";

import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import firebase from "../firebase/firebase";

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailInputColor: "rgba(0, 0, 0, 0.1)",
      emailInputPlaceholder: "email address",
      passwordInputColor: "rgba(0, 0, 0, 0.1)",
      passwordInputPlaceholder: "password"
    };
    // this.state = { email: "Ca@ca.ca", password: "cacaca" };
    // this.state = { email: "Ben@ben.ben", password: "benben" };
  }
  static navigationOptions = {
    header: null
  };
  async login(state, props) {
    var that = this;
    if (state.email !== "") {
      if (state.password !== "") {
        firebase
          .login(state.email, state.password)
          .catch(error =>
            error.code === "auth/invalid-email"
              ? that.setState({ emailInputColor: "red" })
              : error.code === "auth/wrong-password"
              ? that.setState({
                  passwordInputColor: "red",
                  passwordInputPlaceholder: error.message
                })
              : error.code === "auth/user-not-found"
              ? that.setState({ emailInputColor: "red" })
              : alert(error.code)
          );
        props.navigation.navigate("Home");
      } else {
        that.setState({ passwordInputColor: "red" });
      }
    } else {
      if (state.password === "") {
        that.setState({ emailInputColor: "red", passwordInputColor: "red" });
      } else {
        that.setState({ emailInputColor: "red" });
      }
    }
  }
  render() {
    return (
      // <ImageBackground
      //   source={require("../../assets/img-background-signin.png")}
      //   style={{ width: "100%", height: "100%" }}
      // >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <KeyboardAvoidingView behavior="position" enabled>
              <Title style={{}}>Welcome Back.</Title>
              <Card style={{ marginBottom: 20 }}>
                <TextInput
                  style={{ borderColor: this.state.emailInputColor }}
                  autoCapitalize="none"
                  placeholder={this.state.emailInputPlaceholder}
                  autoFocus={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={e =>
                    this.setState({
                      email: e,
                      emailInputColor: "rgba(0, 0, 0, 0.1)"
                    })
                  }
                />
                <TextInput
                  autoCapitalize="none"
                  placeholder={this.state.passwordInputPlaceholder}
                  secureTextEntry
                  returnKeyType="go"
                  style={{
                    marginTop: 20,
                    borderColor: this.state.passwordInputColor
                  }}
                  ref={input => (this.passwordInput = input)}
                  onChangeText={e =>
                    this.setState({
                      password: e,
                      passwordInputColor: "rgba(0, 0, 0, 0.1)"
                    })
                  }
                  onSubmitEditing={() => this.login(this.state, this.props)}
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
                    marginTop: 20,
                    alignItems: "center",
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                    shadowColor: "rgba(0, 0, 0, 1)"
                  }}
                >
                  <Button
                    block
                    onPress={() => this.login(this.state, this.props)}
                    style={{
                      height: 50,
                      backgroundColor: "rgba(0, 0, 0, 0)"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff"
                      }}
                    >
                      Sign in
                    </Text>
                  </Button>
                </LinearGradient>
              </Card>
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Text>
                  Don't have an account ?
                  <Text
                    style={{
                      color: theme.colors.blue,
                      fontSize: 20,
                      fontWeight: "bold"
                    }}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                    {" "}
                    Sign up
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={{ justifyContent: "end", marginBottom: 30 }}>
            <Hr />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                color: "#333333"
              }}
            >
              <Icon.Ionicons name="logo-facebook" size={35} />
              <Icon.Ionicons
                name="logo-github"
                size={35}
                style={{ marginLeft: 30, color: "#333333" }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      // </ImageBackground>
    );
  }
}
