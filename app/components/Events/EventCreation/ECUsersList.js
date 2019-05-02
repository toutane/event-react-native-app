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
import { View } from "react-native";
import { HeaderBackButton } from "react-navigation";
import firebase from "../../../firebase/firebase";
import { TextInput } from "react-native";

export default class ECUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      usersSelected: []
    };
  }
  componentDidMount() {
    firebase.getAllUsers().then(usersList =>
      this.setState({
        usersList: usersList
      })
    );
  }

  render() {
    // async function createNewChat(props, usersSelected, chatName) {
    //   await firebase.createNewChat(chatName).then(groupUid =>
    //     firebase.setUpUsers(groupUid, usersSelected, chatName).then(
    //       props.navigation.navigate("ChatScreen", {
    //         groupUid: groupUid,
    //         groupTitle: chatName
    //       })
    //     )
    //   );
    // }

    const toggleUserToUsersSelected = (uid, avatar) => {
      // add uid from usersSelected []
      if (this.state.usersSelected.some(user => user.uid === uid) === false) {
        this.setState(
          {
            usersSelected: [
              ...this.state.usersSelected,
              // uid
              { uid: uid, avatar: avatar }
            ]
          },
          () => console.log(this.state.usersSelected)
        );
      }
      // supress uid from usersSelected []
      else {
        this.setState(
          {
            usersSelected: this.state.usersSelected.filter(
              uidItem => uidItem.uid !== uid
            )
          },
          () => console.log(this.state.usersSelected)
        );
      }
    };

    return (
      <View>
        {/* <View style={{ marginTop: 15, alignItems: "center" }}>
          {this.state.usersSelected.length !== 0 ? (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Enter chat name..."
                style={{
                  fontSize: 18,
                  margin: 14,
                  height: 37,
                  width: 170,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  borderColor: "#0984e3",
                  borderWidth: 1
                }}
                autoFocus={false}
                returnKeyType="go"
                color="#0984e3"
                onChangeText={e => this.setState({ chatName: e })}
                onSubmitEditing={() =>
                  createNewChat(
                    this.props,
                    [
                      ...this.state.usersSelected,
                      firebase.auth.currentUser.uid
                    ],
                    this.state.chatName
                  )
                }
              />
            </View>
          ) : (
            <View>
              <Button
                transparent
                info
                onPress={() => null}
                style={{ margin: 10 }}
              >
                <Text style={{ fontSize: 18 }}>Select friend(s)</Text>
              </Button>
            </View>
          )}
        </View> */}
        <List>
          {this.state.usersList.map((user, i) => (
            <ListItem avatar key={i}>
              <Left>
                <Thumbnail source={{ uri: user.avatar }} />
              </Left>
              <Body>
                <Text>{user.username}</Text>
                <Text note>{user.bio}</Text>
              </Body>
              {/* <Text note>3:43 pm</Text> */}
              <CheckBox
                checked={this.state.usersSelected.some(
                  c_user => c_user.uid === user.uid
                )}
                style={{ marginRight: 25 }}
                onPress={() => toggleUserToUsersSelected(user.uid, user.avatar)}
              />
            </ListItem>
          ))}
        </List>
        <Button
          onPress={() => {
            this.props.navigation.getParam("addParticipants")(
              this.state.usersSelected
            );
            this.props.navigation.navigate("EventCreationView");
          }}
        >
          <Text>Add selected users</Text>
        </Button>
      </View>
    );
  }
}
