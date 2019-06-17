import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import firebase from "../../../firebase/firebase";
import { Icon } from "expo";

export default class FollowsRequestCard extends React.Component {
  render() {
    return (
      <View>
        {/* {this.props.notifications.filter(
          notif => notif.type === "follow_request"
        ).length !== 0 ? ( */}
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("FollowRequestScreen", {
              notifications: this.props.notifications,
              currentUserFriends: this.props.currentUserFriends,
              avatar: this.props.avatar
            })
          }
        >
          <Card
            style={{
              marginBottom: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Friends Request
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
                  {this.props.notifications.length}
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
              {this.props.notifications.slice(0, 4).map((notif, i) => (
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
              {this.props.notifications.length > 4 ? (
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
        {/* ) : null} */}
      </View>
    );
  }
}
