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
import { View, TextInput, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "react-navigation";
import firebase from "../../../firebase/firebase";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
export default class ECUsersList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      selectedUsers: []
    };
  }
  componentDidMount() {
    firebase.getAllUsers().then(usersList =>
      this.setState({
        usersList: usersList
      })
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
              { uid: uid, avatar: avatar }
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
        <List>
          {this.state.usersList.map((user, i) => (
            <ListItem avatar key={i}>
              <Left>
                <TouchableOpacity
                  onPress={() =>
                    toggleUserToselectedUsers(user.uid, user.avatar)
                  }
                >
                  <Thumbnail
                    source={{ uri: user.avatar }}
                    style={{ borderRadius: 13, width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              </Left>
              <Body>
                <Text>{user.username}</Text>
                <Text note>{user.bio}</Text>
              </Body>
              {/* <Text note>3:43 pm</Text> */}
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
                onPress={() => toggleUserToselectedUsers(user.uid, user.avatar)}
              />
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}
