import React from "react";
import { Text, Button } from "native-base";
import { Card } from "../../components/Card/styles";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase/firebase";

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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAvoidingView behavior="position" enabled>
            <Text
              style={{
                fontSize: 45,
                marginBottom: 10,
                marginLeft: 10
              }}
            >
              Sign <Text style={{ color: "#0984e3", fontSize: 45 }}>in</Text>
            </Text>
            <Card>
              <TextInput
                placeholder="email address"
                style={styles.textInput}
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
                style={[styles.textInput, { marginTop: 20 }]}
                ref={input => (this.passwordInput = input)}
                onChangeText={e => this.setState({ password: e })}
                onSubmitEditing={() => login(this.state, this.props)}
              />
              <View style={{ flexDirection: "row" }}>
                <Button
                  bordered
                  onPress={() => this.props.navigation.navigate("SignUp")}
                  style={{
                    borderColor: "#363A43",
                    marginTop: 20,
                    marginRight: 45
                  }}
                >
                  <Icon
                    name="user-plus"
                    size={20}
                    color={"#363A43"}
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ color: "#363A43" }}>Sign up</Text>
                </Button>
                <Button
                  bordered
                  onPress={() => login(this.state, this.props)}
                  style={{ borderColor: "#363A43", marginTop: 20 }}
                >
                  <Icon
                    name="sign-in"
                    size={20}
                    color={"#0984e3"}
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ color: "#363A43" }}>Login</Text>
                </Button>
              </View>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#ffff",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 28,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 20
  },
  textInput: {
    height: 34,
    width: 270,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "rgba(54,58,67,1)",
    borderWidth: 1,
    fontSize: 16
  }
});
