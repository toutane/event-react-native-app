import React from "react";
import { View, ScrollView, Text } from "react-native";
import firebase from "../../firebase/firebase";
import ProfileCard from "./ProfileCard";

export default class ProfileView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      currentUserFriends: [],
      spinner: false
    };
  }
  componentDidMount() {
    firebase
      .getCurrentUserAvatar()
      .then(avatar => this.setState({ avatar: avatar }));
    firebase.getCurrentUserBio().then(bio => this.setState({ bio: bio }));
  }

  render() {
    return (
      <ScrollView
        scrollEventThrottle={16}
        style={{ marginBottom: 100 }}
        onScroll={this.props.scrollAnimation}
      >
        <View style={{ marginTop: 50, marginBottom: 100 }}>
          <ProfileCard avatar={this.state.avatar} />
        </View>
      </ScrollView>
    );
  }
}
