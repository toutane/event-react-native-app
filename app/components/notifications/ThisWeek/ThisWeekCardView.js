import React from "react";
import { View, Text } from "react-native";
import FollowRequestNotifItem from "../FollowRequest/FollowRequestNotifItem";

export default class ThisWeekCardView extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 15 }}>
        {this.props.notifications
          .filter(
            notifs => notifs.type === "follow_request_accepted" || "new_friend"
          )
          .slice(
            0,
            this.props.minimizeCard ? 3 : this.props.notifications.length
          )
          .map((notif, i) => (
            <FollowRequestNotifItem
              {...this.props}
              key={i}
              i={i}
              notif={notif}
            />
          ))}
        {this.props.minimizeCard ? (
          this.props.notifications.filter(
            notif => notif.type === "follow_request_accepted" || "new_friend"
          ).length > 4 ? (
            <View
              style={{
                borderRadius: 13,
                backgroundColor: "#F9F0DB",
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
                  notif =>
                    notif.type === "follow_request_accepted" || "new_friend"
                ).length - 3}
              </Text>
            </View>
          ) : null
        ) : null}
      </View>
    );
  }
}
