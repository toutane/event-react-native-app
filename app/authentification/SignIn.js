import React from "react";
import { Text, Button } from "native-base";
import { Card } from "../components/Card/styles";
import { Title } from "../components/Title/styles";
import { TextInput } from "../components/TextInput/styles";
import { Hr } from "../components/Hr/styles";
import { Icon, LinearGradient } from "expo";

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
    // this.state = { email: "", password: "" };
    this.state = { email: "Ca@ca.ca", password: "cacaca" };
    // this.state = { email: "Ben@ben.ben", password: "benben" };
  }
  static navigationOptions = {
    header: null
  };
  render() {
    async function login(state, props) {
      try {
        await firebase.login(state.email, state.password);
        props.navigation.navigate("Home");
      } catch (error) {
        alert(error.message);
      }
    }
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
                  autoCapitalize="none"
                  placeholder="email address"
                  autoFocus={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={e => this.setState({ email: e })}
                />
                <TextInput
                  autoCapitalize="none"
                  placeholder="password"
                  secureTextEntry
                  returnKeyType="go"
                  style={{ marginTop: 20 }}
                  ref={input => (this.passwordInput = input)}
                  onChangeText={e => this.setState({ password: e })}
                  onSubmitEditing={() => login(this.state, this.props)}
                />
                <LinearGradient
                  colors={[
                    "rgba(67, 67, 229, 1)",
                    "rgba(60, 80, 242, 1)",
                    "rgba(50, 94, 236, 1)"
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
                    onPress={() => login(this.state, this.props)}
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
                      color: "rgba(60, 80, 242, 1)",
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
