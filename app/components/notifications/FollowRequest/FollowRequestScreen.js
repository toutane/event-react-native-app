import React from "react";
import { List, Thumbnail, Button } from "native-base";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

import firebase from "../../../firebase/firebase";
import FriendsActions from "../../../actions/friendsActions";
import NotifsActions from "../../../actions/notificationsActions";
import UsersActions from "../../../actions/usersActions";

import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
export default class FollowRequestScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      acceptRequest: [],
      notifications: [],
      search: "",
      currentuser_nb_friends: 0,
      newfriend_nb_friends: 0
    };
  }
  componentDidMount() {
    this.listenToChanges();
    this.setState({
      notifications: this.props.navigation.getParam("notifications")
    });
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .onSnapshot(() =>
        this.setState({ spinner: true }, () =>
          UsersActions.GET_USER_NB_FRIENDS(firebase.auth.currentUser.uid).then(
            nb => this.setState({ currentuser_nb_friends: nb })
          )
        )
      );
  }
  async acceptRequest(newFriend) {
    await FriendsActions.ADD_FRIEND_TO_CURRENTUSER(newFriend);
    await FriendsActions.ADD_FRIEND_TO_USER(
      newFriend.user.uid,
      this.props.navigation.getParam("bio"),
      this.props.navigation.getParam("avatar")
    );
    await NotifsActions.DELETE_NOTIFICATION(
      firebase.auth.currentUser.uid,
      newFriend.uid
    );
    await UsersActions.GET_USER_NB_FRIENDS(newFriend.user.uid).then(nb =>
      this.setState({ newfriend_nb_friends: nb })
    );
    NotifsActions.FOLLOW_REQUEST_ACCEPTED(
      newFriend.user.uid,
      this.props.navigation.getParam("avatar")
    );
    NotifsActions.BECOME_NEW_FRIEND(newFriend);
    FriendsActions.INCREASE_NB_FRIENDS(
      firebase.auth.currentUser.uid,
      this.state.currentuser_nb_friends
    );
    FriendsActions.INCREASE_NB_FRIENDS(
      newFriend.user.uid,
      this.state.newfriend_nb_friends
    );
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
              Friends Request
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
              onPress={() => this.props.navigation.navigate("Notification")}
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
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      // console.log("🖕")
                      this.props.navigation.navigate("ProfileView", {
                        // user_uid: "iFBrOJHTJqd8IcIgVctD5qDvrO02"
                        user_uid: notif.user.uid
                      })
                    }
                  >
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
                  </TouchableOpacity>
                  {this.state.acceptRequest.some(uid => uid === notif.uid) ? (
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
                                notif.uid
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
                                notifs => notif.uid !== notifs.uid
                              )
                            },
                            () =>
                              NotifsActions.DELETE_NOTIFICATION(
                                firebase.auth.currentUser.uid,
                                notif.uid
                              )
                          )
                        }
                      >
                        <Text
                          style={{ fontSize: 13, color: "rgba(0, 0, 0, 0.3)" }}
                        >
                          Refuse
                        </Text>
                      </Button>
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
