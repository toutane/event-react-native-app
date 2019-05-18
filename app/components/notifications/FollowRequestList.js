import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { Text, Button, Thumbnail, Spinner } from "native-base";
import firebase from "../../firebase/firebase";

export default class FollowRequestList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { currentUserFriends: [] };
  }
  componentDidMount() {
    this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .onSnapshot(() =>
        firebase
          .getCurrentUserFriends()
          .then(friends =>
            this.setState(
              { currentUserFriends: friends },
              this.setState({ spinner: false })
            )
          )
      );
  }
  deletedNotif(currentNotif) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .update({
        notifications: this.props.notifications.filter(
          notif => notif.user.uid !== currentNotif.uid
        )
      });

    console.log("event quited...");
  }
  acceptRequest(newFriend) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .update({
        friends: this.state.currentUserFriends.concat({
          uid: newFriend.uid,
          username: newFriend.username,
          avatar: newFriend.avatar,
          bio: newFriend.bio
        })
      }),
      () => this.deletedNotif(newFriend);
  }
  render() {
    return (
      <ScrollView
        scrollEventThrottle={16}
        style={{ top: 10, marginBottom: 100 }}
        onScroll={this.props.scrollAnimation}
      >
        <View style={{ marginTop: 80, marginBottom: 100 }}>
          {this.props.spinner ? (
            <Spinner />
          ) : (
            this.props.notifications.map((notif, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Thumbnail
                    source={{ uri: notif.user.avatar }}
                    style={{ borderRadius: 13, width: 50, height: 50 }}
                  />
                  <View style={{ flexDirection: "column", marginLeft: 10 }}>
                    <Text>{notif.user.username}</Text>
                    <Text note>{notif.user.bio}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  {/* <Button
                    rounded
                    style={{
                      marginRight: 7,
                      height: 28,
                      backgroundColor: "#1DC161",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>Yes</Text>
                  </Button>
                  <Button
                    rounded
                    style={{
                      height: 28,
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>No</Text>
                  </Button> */}
                  <TouchableOpacity
                    onPress={() => this.acceptRequest(notif.user)}
                  >
                    <Icon.Feather
                      name="check"
                      size={24}
                      color="#1DC161"
                      style={{ marginTop: 2, marginBottom: 3 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon.Feather
                      name="x"
                      size={24}
                      color="#FE245D"
                      style={{ marginTop: 2, marginBottom: 3, marginLeft: 8 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  }
}
