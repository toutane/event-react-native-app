import React from "react";
import { View, Text } from "react-native";
import firebase from "../firebase/firebase";
import HomeStackNavigator from "../navigation/AppNavigator";
import AuthStack from "../navigation/AuthNavigator";
import ThemeProvider from "../themes";

export default class FirebaseInitialization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseInitialized: false,
      loading: true,
      authenticated: false
    };
  }
  componentDidMount() {
    firebase.isInitialized().then(val => {
      this.setState({ firebaseInitialized: val }, () =>
        firebase.auth.onAuthStateChanged(user => {
          if (user) {
            this.setState({ loading: false, authenticated: true }, () =>
              console.log(this.state.authenticated)
            );
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        })
      );
    });
  }
  render() {
    return this.state.firebaseInitialized !== false ? (
      !this.state.authenticated ? (
        <AuthStack />
      ) : (
        <ThemeProvider>
          <HomeStackNavigator />
        </ThemeProvider>
      )
    ) : (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ top: 250, fontSize: 30 }}>
          <Text style={{ color: "#0984e3", fontSize: 40 }}>firebase </Text>
          initializing...
        </Text>
      </View>
    );
  }
}
