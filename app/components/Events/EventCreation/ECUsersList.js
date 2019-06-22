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
import { HeaderBackButton } from "react-navigation";
import firebase from "../../../firebase/firebase";
import { screenWidth } from "../../../utils/dimensions";
import UsersActions from "../../../actions/usersActions";
import Avatar from "../../Avatar/Avatar";
import { Icon } from "expo";
export default class ECUsersList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      selectedUsers: [],
      search: ""
    };
  }
  _keyExtractor = (item, index) => item.uid;
  componentDidMount() {
    UsersActions.GET_ALL_USERS().then(usersList =>
      this.setState(
        {
          usersList: usersList
          // [...usersList, { key: usersList.indexOf(user) }]
          // usersList.forEach(user => {
          //   user, { key: usersList.indexOf(user) };
          // })
        },
        () => console.log(this.state.usersList)
      )
    );
    this.setState({
      selectedUsers: this.props.navigation.getParam("invited_participants")
    });
  }

  render() {
    const toggleUserToselectedUsers = (uid, avatar) => {
      // add uid from selectedUsers []
      if (this.state.selectedUsers.some(user => user.uid === uid) === false) {
        this.setState(
          {
            selectedUsers: [
              ...this.state.selectedUsers,
              // uid
              { uid: uid, avatar: avatar, state: "waiting" }
            ]
          },
          () => console.log(this.state.selectedUsers)
        );
      }
      // supress uid from selectedUsers []
      else {
        this.setState(
          {
            selectedUsers: this.state.selectedUsers.filter(
              uidItem => uidItem.uid !== uid
            )
          },
          () => console.log(this.state.selectedUsers)
        );
      }
    };
    const searchedUsers = this.state.usersList.filter(user =>
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
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Participants
            </Text>
            <Button
              style={{
                position: "absolute",
                left: screenWidth - 50,
                top: -7,
                height: 35,
                width: 35,
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                justifyContent: "center"
              }}
              onPress={() =>
                this.props.navigation.navigate("EventCreationView")
              }
            >
              <Icon.Ionicons
                name="ios-arrow-round-up"
                size={25}
                color="black"
              />
            </Button>
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
              onChangeText={e =>
                this.setState({
                  search: e
                })
              }
            />
            <Button
              style={{
                position: "absolute",
                left: screenWidth - 50,
                height: 35,
                width: 35,
                borderRadius: 10,
                backgroundColor:
                  this.state.selectedUsers.length > 0 &&
                  this.state.selectedUsers !==
                    this.props.navigation.getParam("invited_participants")
                    ? "#1DC161"
                    : "rgba(0, 0, 0, 0.04)",
                justifyContent: "center"
              }}
              onPress={
                this.state.selectedUsers.length > 0 &&
                this.state.selectedUsers !==
                  this.props.navigation.getParam("invited_participants")
                  ? () => {
                      this.props.navigation.getParam("addParticipants")(
                        this.state.selectedUsers
                      );
                      this.props.navigation.navigate("EventCreationView");
                    }
                  : null
              }
            >
              <Icon.Feather
                name="check"
                size={20}
                color={
                  this.state.selectedUsers.length > 0 &&
                  this.state.selectedUsers !==
                    this.props.navigation.getParam("invited_participants")
                    ? "white"
                    : "black"
                }
              />
            </Button>
          </View>
        </View>
        <FlatList
          style={{
            // marginTop: 20,
            marginBottom: 150
          }}
          data={searchedUsers}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => toggleUserToselectedUsers(item.uid, item.avatar)}
            >
              <View
                style={{
                  marginTop:
                    searchedUsers.findIndex(user => user.uid === item.uid) === 0
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
                  <CheckBox
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
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {/* <List>
          {searchedUsers.map((user, i) => (
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
