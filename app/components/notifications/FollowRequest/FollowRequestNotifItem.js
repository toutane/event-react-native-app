import React from "react";
import { Thumbnail, Button } from "native-base";
import { View, Text, TouchableWithoutFeedback } from "react-native";
export default class FollowRequestNotifItem extends React.Component {
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
            <View style={{ flexDirection: "row", marginLeft: 10, width: 150 }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                {this.props.notif.user.username}
                {this.props.notif.type === "follow_request_accepted" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    started following you.
                  </Text>
                ) : null}
              </Text>
            </View>
          </View>
          {this.props.currentUserFriends.some(
            user => user.uid === this.props.notif.user.uid
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
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
