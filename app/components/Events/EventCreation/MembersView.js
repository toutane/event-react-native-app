import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Badge, Button } from "native-base";
import { screenWidth } from "../../../utils/dimensions";
import firebase from "../../../firebase/firebase";
import UsersActions from "../../../actions/usersActions";
import Avatar from "../../Avatar/Avatar";
import { Feather } from "@expo/vector-icons";

export default class MembersView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      organizer_avatar: "default"
    };
  }
  componentDidMount() {
    UsersActions.GET_USER_AVATAR(firebase.auth.currentUser.uid).then(avatar =>
      this.setState({ organizer_avatar: avatar })
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#158E47" }}>
        <View style={{ backgroundColor: "#158E47" }}>
          <View style={styles.headerBox}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 28
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  The participants{" "}
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    (1/{1 + this.props.invited_participants.length})
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Profile")}
                >
                  <Thumbnail
                    source={{
                      uri: this.state.organizer_avatar
                    }}
                    style={{
                      borderRadius: 13,
                      width: 45,
                      height: 45
                    }}
                  />
                  <Badge
                    primary
                    style={{
                      backgroundColor: "#1DC161",
                      position: "absolute",
                      top: 35,
                      right: -4,
                      width: 10,
                      height: 12
                    }}
                  />
                </TouchableOpacity>
                {this.props.invited_participants
                  .slice(0, 3)
                  .map((participant, i) => (
                    <Avatar
                      key={i}
                      user={{
                        uid: participant.uid,
                        avatar: participant.avatar
                      }}
                      {...this.props}
                    />
                    // <Thumbnail
                    //   key={i}
                    //   source={{ uri: participants.avatar }}
                    //   style={{
                    //     borderRadius: 13,
                    //     width: 45,
                    //     height: 45,
                    //     marginLeft: 8
                    //   }}
                    // />
                  ))}
                {this.props.invited_participants.length > 4 ? (
                  <View
                    style={{
                      borderRadius: 13,
                      backgroundColor: "#F9F0DB",
                      marginLeft: 10,
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fead01",
                        fontWeight: "bold",
                        fontSize: 16
                      }}
                    >
                      +{this.props.invited_participants.length - 3}
                    </Text>
                  </View>
                ) : null}
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
                onPress={() =>
                  this.props.navigation.navigate("EventCreation_UsersList", {
                    addParticipants: part => this.props.addParticipants(part),
                    invited_participants: this.props.invited_participants
                  })
                }
              >
                <Button
                  style={{
                    borderRadius: 13,
                    backgroundColor: "#fead01",
                    width: 45,
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("EventCreation_UsersList", {
                      addParticipants: part => this.props.addParticipants(part),
                      invited_participants: this.props.invited_participants
                    })
                  }
                >
                  <Feather name="plus" size={25} color="white" />
                </Button>
                <Text
                  style={{
                    marginLeft: 15,
                    color: "#fead01",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  Add participants
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: screenWidth,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white"
  }
});
