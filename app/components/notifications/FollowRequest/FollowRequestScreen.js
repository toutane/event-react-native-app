import React from "react";
import { List, Thumbnail, Button } from "native-base";
import { View, TextInput, Text, TouchableWithoutFeedback } from "react-native";
import firebase from "../../../firebase/firebase";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
export default class FollowRequestScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { acceptRequest: [], notifications: [], search: "" };
  }
  componentDidMount() {
    this.setState({
      notifications: this.props.navigation.getParam("notifications")
    });
  }
  async acceptRequest(newFriend) {
    await firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .update({
        friends: this.props.navigation.getParam("currentUserFriends").concat({
          uid: newFriend.user.uid,
          username: newFriend.user.username,
          avatar: newFriend.user.avatar,
          bio: newFriend.user.bio
        })
      });
    this.deletedNotif(newFriend);
    this.returnAcceptNotif(newFriend);
  }
  returnAcceptNotif(newFriend) {
    firebase.db
      .collection("users")
      .doc(newFriend.user.uid)
      .collection("notifications")
      .add({
        type: "follow_request_accepted",
        text: `${
          firebase.auth.currentUser.displayName
        } has accept your follow request!`
      });
  }

  deletedNotif(currentNotif) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("notifications")
      .doc(currentNotif.uid)
      .delete();
    // .update({
    //   notifications: this.state.notifications.filter(
    //     notif => notif.user.uid !== currentNotif.user.uid
    //   )
    // });
  }
  render() {
    const searchedNotifs = this.state.notifications.filter(notif =>
      notif.user.username
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    );
    return (
      <View>
        <View
          style={{
            paddingVertical: 15,
            backgroundColor: "#F7F7F7"
          }}
        >
          <View
            style={{
              marginTop: 40,
              marginBottom: 23,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Follow Request
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                width: screenWidth - 75,
                height: 36,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderRadius: 10,
                paddingHorizontal: 10,
                fontSize: 18
              }}
              selectionColor={"#1DC161"}
              autoCapitalize="none"
              placeholder={"search"}
              autoFocus={false}
              returnKeyType="next"
              value={this.state.search}
              onChangeText={e => this.setState({ search: e })}
              // onSubmitEditing={() => this.passwordInput.focus()}
              // onChangeText={e =>
              //   this.setState({
              //     email: e,
              //     emailInputColor: "rgba(0, 0, 0, 0.1)",
              //     error: "null"
              //   })
              // }
            />
            <Button
              style={{
                position: "absolute",
                left: screenWidth - 50,
                height: 35,
                width: 35,
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                justifyContent: "center"
              }}
              onPress={() =>
                this.props.navigation.navigate("NotificationsScreen")
              }
            >
              <Icon.Ionicons
                name="ios-arrow-round-up"
                size={25}
                color="black"
              />
            </Button>
          </View>
        </View>
        <List>
          {searchedNotifs
            .filter(notif => notif.type === "follow_request")
            .map((notif, i) => (
              <TouchableWithoutFeedback key={i}>
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    marginTop: i === 0 ? 20 : 0,
                    marginBottom: 20,
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
                      <Text style={{ fontWeight: "600", fontSize: 15 }}>
                        {notif.user.username}
                      </Text>
                      <Text style={{ color: "rgba(0, 0, 0, 0.3)" }}>
                        {notif.user.bio.length > 18
                          ? notif.user.bio.slice(0, 18) + "..."
                          : notif.user.bio}
                      </Text>
                    </View>
                  </View>
                  {this.state.acceptRequest.some(
                    uid => uid === notif.user.uid
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
                          marginRight: 7,
                          height: 28,
                          paddingHorizontal: 10,
                          backgroundColor: "#1DC161",
                          alignItems: "center"
                        }}
                        onPress={() =>
                          this.setState(
                            {
                              acceptRequest: this.state.acceptRequest.concat(
                                notif.user.uid
                              )
                            },
                            () => this.acceptRequest(notif)
                          )
                        }
                      >
                        <Text style={{ fontSize: 13, color: "white" }}>
                          Accept
                        </Text>
                      </Button>
                      <Button
                        bordered
                        rounded
                        style={{
                          height: 28,
                          paddingHorizontal: 10,
                          alignItems: "center",
                          borderColor: "rgba(0, 0, 0, 0.3)"
                        }}
                        onPress={() =>
                          this.setState(
                            {
                              notifications: this.state.notifications.filter(
                                notif => notif.user.uid !== notif.user.uid
                              )
                            },
                            () => this.deletedNotif(notif)
                          )
                        }
                      >
                        <Text
                          style={{ fontSize: 13, color: "rgba(0, 0, 0, 0.3)" }}
                        >
                          Refuse
                        </Text>
                      </Button>
                      {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            ))}
        </List>
      </View>
    );
  }
}
