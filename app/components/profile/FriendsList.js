import React from "react";
import {
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  CheckBox,
  Button
} from "native-base";
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import firebase from "../../firebase/firebase";
import { screenWidth } from "../../utils/dimensions";
import UsersActions from "../../actions/usersActions";
import { Icon } from "expo";
export default class FriendsList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      friendsList: [],
      // selectedUsers: [],
      search: ""
    };
  }
  _keyExtractor = (item, index) => item.uid;
  componentDidMount() {
    this.listenToChanges(this.props.navigation.getParam("user_uid"));
  }
  componentWillUpdate() {
    this.listenToChanges(this.props.navigation.getParam("user_uid"));
  }
  async listenToChanges(userUid) {
    firebase.db
      .collection("users")
      .doc(userUid)
      .collection("friends")
      .onSnapshot(() => this.loadFriends(userUid));
  }

  async loadFriends(userUid) {
    UsersActions.GET_USER_FRIENDS(userUid).then(friendsList =>
      this.setState(
        {
          friendsList: friendsList
        }
        // () => console.log(this.state.friendsList)
      )
    );
  }

  render() {
    const searchedFriends = this.state.friendsList.filter(user =>
      user.username.toLowerCase().includes(this.state.search.toLowerCase())
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
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Friends</Text>
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
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Icon.Ionicons
                name="ios-arrow-round-up"
                size={25}
                color="black"
              />
            </Button>
          </View>
        </View>
        <FlatList
          style={{
            // marginTop: 20,
            marginBottom: 150
          }}
          data={searchedFriends}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ProfileView", {
                  user_uid: item.uid
                })
              }
            >
              <View
                style={{
                  marginTop:
                    searchedFriends.findIndex(user => user.uid === item.uid) ===
                    0
                      ? 20
                      : 0,
                  flexDirection: "row",
                  marginBottom: 20,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      this.props.navigation.navigate("ProfileView", {
                        user_uid: item.uid
                      })
                    }
                  >
                    <Thumbnail
                      source={{ uri: item.avatar }}
                      style={{ borderRadius: 13, width: 50, height: 50 }}
                    />
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ fontWeight: "600", fontSize: 15 }}>
                        {item.username.length > 19
                          ? item.username.slice(0, 16) + "..."
                          : item.username}
                      </Text>
                      <Text style={{ color: "rgba(0, 0, 0, 0.3)" }}>
                        {item.bio.length > 18
                          ? item.bio.slice(0, 18) + "..."
                          : item.bio}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Icon.Feather name="more-vertical" size={25} color="black" />
                  {/* <CheckBox
                    checked={this.state.selectedUsers.some(
                      c_item => c_item.uid === item.uid
                    )}
                    color={"#1DC161"}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 5,
                      marginRight: 25
                    }}
                    onPress={() =>
                      toggleUserToselectedUsers(item.uid, item.avatar)
                    }
                  /> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <List>
          {searchedFriends.map((user, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => toggleUserToselectedUsers(user.uid, user.avatar)}
            >
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
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      this.props.navigation.navigate("ProfileView", {
                        user_uid: user.uid
                      })
                    }
                  >
                    <Thumbnail
                      source={{ uri: user.avatar }}
                      style={{ borderRadius: 13, width: 50, height: 50 }}
                    />
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ fontWeight: "600", fontSize: 15 }}>
                        {user.username.length > 19
                          ? user.username.slice(0, 16) + "..."
                          : user.username}
                      </Text>
                      <Text style={{ color: "rgba(0, 0, 0, 0.3)" }}>
                        {user.bio.length > 18
                          ? user.bio.slice(0, 18) + "..."
                          : user.bio}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <CheckBox
                    checked={this.state.selectedUsers.some(
                      c_user => c_user.uid === user.uid
                    )}
                    color={"#1DC161"}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 5,
                      marginRight: 25
                    }}
                    onPress={() =>
                      toggleUserToselectedUsers(user.uid, user.avatar)
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </List> */}
      </View>
    );
  }
}
