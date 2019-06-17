import React from "react";
import { Thumbnail, Button } from "native-base";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import firebase from "../../../firebase/firebase";
export default class FollowsRequestNotifItem extends React.Component {
  setRequest(receiver) {
    firebase.db
      .collection("users")
      .doc(receiver.user.uid)
      .collection("notifications")
      .add({
        type: "follow_request",
        user: {
          uid: firebase.auth.currentUser.uid,
          username: firebase.auth.currentUser.displayName,
          bio: this.props.bio,
          avatar: this.props.avatar
        }
      });
  }
  render() {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: "row",
            marginTop: this.props.i === 0 ? 20 : 0,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Thumbnail
              source={{ uri: this.props.notif.user.avatar }}
              style={{ borderRadius: 13, width: 50, height: 50 }}
            />
            <View style={{ flexDirection: "row", marginLeft: 10, width: 170 }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                {this.props.notif.user.username}
                {this.props.notif.type === "follow_request_accepted" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    has accepted your request.
                  </Text>
                ) : (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    become your friend !
                  </Text>
                )}
              </Text>
            </View>
          </View>
          {
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
                  Friends
                </Text>
              </Button>
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
