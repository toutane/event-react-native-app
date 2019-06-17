import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import firebase from "../../../firebase/firebase";
import { Icon } from "expo";
import ThisWeekCardView from "./ThisWeekCardView";

export default class ThisWeekCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimizeCard: true
    };
  }

  render() {
    return (
      <View>
        {this.props.notifications.filter(
          notif => notif.type === "follow_request"
        ).length !== 0 ? (
          <TouchableOpacity
            // onPress={() =>
            //   this.props.navigation.navigate("FollowRequestScreen", {
            //     notifications: this.props.notifications.filter(
            //       notif => notif.type === "follow_request"
            //     )
            //   })
            // }
            onPress={() =>
              this.setState({ minimizeCard: !this.state.minimizeCard })
            }
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
                <Text style={{ fontWeight: "bold", fontSize: 26 }}>
                  This Week
                </Text>
                <Icon.Feather
                  name="arrow-down"
                  size={25}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <Icon.Ionicons
                    name="ios-arrow-round-forward"
                    size={30}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                </View> */}
              </View>
              <ThisWeekCardView
                minimizeCard={this.state.minimizeCard}
                {...this.props}
              />
            </Card>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
