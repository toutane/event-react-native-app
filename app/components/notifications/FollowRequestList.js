import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Icon } from "expo";
import { Button, Thumbnail, Spinner } from "native-base";
import firebase from "../../firebase/firebase";

export default class FollowRequestList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      currentUserFriends: [],
      refuseRequest: [],
      acceptRequest: []
    };
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
          .then(friends => this.setState({ currentUserFriends: friends }))
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
      });
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
            this.props.notifications.map((notif, i) =>
              this.state.refuseRequest.some(
                username => username === notif.user.username
              ) ? null : (
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
                  {this.state.acceptRequest.some(
                    username => username === notif.user.username
                  ) ? (
                    <View>
                      <Button
                        rounded
                        bordered
                        style={{
                          borderColor: "#1DC161",
                          paddingHorizontal: 10,
                          height: 28,
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#1DC161"
                          }}
                        >
                          Following
                        </Text>
                      </Button>
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        rounded
                        style={{
                          marginRight: 5,
                          height: 28,
                          paddingHorizontal: 10,
                          backgroundColor: "#1DC161",
                          alignItems: "center"
                        }}
                        onPress={() =>
                          this.setState(
                            {
                              acceptRequest: this.state.acceptRequest.concat(
                                notif.user.username
                              )
                            },
                            () => this.acceptRequest(notif.user)
                          )
                        }
                      >
                        <Text
                          style={{
                            color: "white"
                          }}
                        >
                          Yes
                        </Text>
                      </Button>
                      <Button
                        rounded
                        bordered
                        style={{
                          borderColor: "rgba(0, 0, 0, 0.2)",
                          paddingHorizontal: 10,
                          height: 28,
                          alignItems: "center"
                        }}
                        onPress={() =>
                          this.setState(
                            {
                              refuseRequest: this.state.refuseRequest.concat(
                                notif.user.username
                              )
                            },
                            () => this.deletedNotif(notif.user)
                          )
                        }
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            // fontWeight: "bold",
                            color: "rgba(0, 0, 0, 0.2)"
                          }}
                        >
                          No
                        </Text>
                      </Button>
                      {/* <TouchableOpacity
                      onPress={() =>
                        this.setState({ refuseRequest: notif.username }, () =>
                          this.deletedNotif(notif.user, "accept")
                        )
                      }
                    >
                      <Icon.Feather
                        name="check"
                        size={24}
                        color="#1DC161"
                        style={{ marginTop: 2, marginBottom: 3 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ refuseRequest: notif.username }, () =>
                          this.deletedNotif(notif.user, "refuse")
                        )
                      }
                    >
                      <Icon.Feather
                        name="x"
                        size={24}
                        color="#FE245D"
                        style={{ marginTop: 2, marginBottom: 3, marginLeft: 8 }}
                      />
                    </TouchableOpacity> */}
                    </View>
                  )}
                </View>
              )
            )
          )}
        </View>
      </ScrollView>
    );
  }
}
