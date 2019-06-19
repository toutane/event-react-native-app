import React from "react";
import { Thumbnail, Button } from "native-base";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import firebase from "../../../firebase/firebase";
import ThisWeekCardView from "../ThisWeek/ThisWeekCardView";
export default class FollowsRequestNotifItem extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: "row",
            marginTop: this.props.i === 0 ? 20 : 0,
            marginBottom:
              this.props.i + 1 === this.props.notifications.length ? 0 : 20,
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
                {this.props.notif.user.username ===
                firebase.auth.currentUser.displayName
                  ? "You"
                  : this.props.notif.user.username}
                {this.props.notif.type === "follow_request_accepted" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    has accepted your request !
                  </Text>
                ) : this.props.notif.type === "new_friend" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    become your friend !
                  </Text>
                ) : this.props.notif.type === "event_created" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    just created a event
                  </Text>
                ) : null}
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
