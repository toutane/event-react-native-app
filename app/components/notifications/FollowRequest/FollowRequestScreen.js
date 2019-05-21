import React from "react";
import {
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  CheckBox,
  Button
} from "native-base";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import firebase from "../../../firebase/firebase";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
export default class FollowRequestScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { acceptRequest: [], notifications: [] };
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
  }
  deletedNotif(currentNotif) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .update({
        notifications: this.state.notifications.filter(
          notif => notif.user.uid !== currentNotif.user.uid
        )
      });
  }
  render() {
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
          {// this.props.navigation
          // .getParam("notifications")
          this.state.notifications
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

// <ListItem thumbnail>
//   <Left>
//     {/* <TouchableOpacity
//     onPress={() =>
//       toggleUserToselectedUsers(notif.user.uid, notif.user.avatar)
//     }
//   > */}
//     <Thumbnail
//       source={{ uri: notif.user.avatar }}
//       style={{ borderRadius: 13 }}
//     />
//     {/* </TouchableOpacity> */}
//   </Left>
//   <Body>
//     <Text>{notif.user.username}</Text>
//     <Text note>{notif.user.bio}</Text>
//   </Body>
//   {/* <Text note>3:43 pm</Text> */}
//   <CheckBox
//     checked={this.state.selectedUsers.some(
//       c_notif => c_notif.user.username === notif.user.username
//     )}
//     color={"#1DC161"}
//     style={{
//       height: 20,
//       width: 20,
//       borderRadius: 5,
//       marginRight: 25
//     }}
//     onPress={() =>
//       toggleUserToselectedUsers(
//         notif.user.uid,
//         notif.user.avatar
//       )
//     }
//   />
// </ListItem>
