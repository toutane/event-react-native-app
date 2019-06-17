import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import firebase from "../../../firebase/firebase";
import { Icon } from "expo";

export default class FollowRequestCard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUserFriends: []
  //   };
  // }
  // componentDidMount() {
  //   this.listenToChanges();
  // }
  // async listenToChanges() {
  //   firebase.db
  //     .collection("users")
  //     .doc(firebase.auth.currentUser.uid)
  //     .onSnapshot(() =>
  //       firebase
  //         .getCurrentUserFriends()
  //         .then(friends => this.setState({ currentUserFriends: friends }))
  //     );
  // }
  render() {
    return (
      <View>
        {this.props.notifications.filter(
          notif => notif.type === "follow_request"
        ).length !== 0 ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FollowRequestScreen", {
                notifications: this.props.notifications.filter(
                  notif => notif.type === "follow_request"
                ),
                currentUserFriends: this.props.currentUserFriends
              })
            }
            // onPress={() => console.log(this.props.notifications)}
          >
            <Card
              style={{
                marginBottom: 20
                // backgroundColor: "rgba(249,240,219, 1)"
                // borderWidth: 1, borderColor: "#fead01"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                {/* <View
                  style={{
                    height: 7,
                    width: 7,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginRight: 10,
                    backgroundColor: "#1DC161"
                  }}
                /> */}
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Follow Request
                  {this.props.notifications.filter(
                    notif => notif.type === "follow_request"
                  ).length > 1
                    ? "s"
                    : null}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#1DC161"
                    }}
                  >
                    {
                      this.props.notifications.filter(
                        notif => notif.type === "follow_request"
                      ).length
                    }
                  </Text>
                  <Icon.Feather
                    name="arrow-right"
                    size={25}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {this.props.notifications
                  .filter(notif => notif.type === "follow_request")
                  .slice(0, 4)
                  .map((notif, i) => (
                    <Thumbnail
                      key={i}
                      source={{ uri: notif.user.avatar }}
                      style={{
                        borderRadius: 13,
                        width: 45,
                        height: 45,
                        marginLeft: i === 0 ? 0 : 8
                      }}
                    />
                  ))}
                {this.props.notifications.filter(
                  notif => notif.type === "follow_request"
                ).length > 4 ? (
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
                      +
                      {this.props.notifications.filter(
                        notif => notif.type === "follow_request"
                      ).length - 4}
                    </Text>
                  </View>
                ) : null}
              </View>
            </Card>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
