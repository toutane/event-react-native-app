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
  KeyboardAvoidingView
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <KeyboardAvoidingView behavior="position" enabled>
              <Title style={{}}>Welcome Back.</Title>
              <Card style={{ marginBottom: 20 }}>
                <TextInput
                  placeholder="email address"
                  autoFocus={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={e => this.setState({ email: e })}
                />
                <TextInput
                  placeholder="password"
                  secureTextEntry
                  returnKeyType="go"
                  style={{ marginTop: 20 }}
                  ref={input => (this.passwordInput = input)}
                  onChangeText={e => this.setState({ password: e })}
                  onSubmitEditing={() => login(this.state, this.props)}
                />
                <LinearGradient
                  colors={["#ec5a34", "#FC5E37", "#FC7B3F"]}
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
                    onPress={() => login(this.state, this.props)}
                    style={{ height: 50, backgroundColor: "rgba(0, 0, 0, 0)" }}
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
                    style={{ color: "#FC5E37", fontSize: 20 }}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                    {" "}
                    Sign up !
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
                marginTop: 10
              }}
            >
              <Icon.Ionicons name="logo-facebook" size={35} />
              <Icon.Ionicons
                name="logo-github"
                size={35}
                style={{ marginLeft: 30 }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
