import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import firebase from "../../../firebase/firebase";
import { Feather } from "@expo/vector-icons";
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
        {/* {this.props.notifications.filter(
          notif => notif.type === "follow_request"
        ).length !== 0 ? ( */}
        <TouchableOpacity
          onPress={() =>
            this.setState({ minimizeCard: !this.state.minimizeCard })
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
              <Text style={{ fontWeight: "bold", fontSize: 26 }}>
                This Week
              </Text>
              {this.props.notifications.length > 3 ? (
                this.state.minimizeCard ? (
                  <Feather
                    name="arrow-down"
                    size={25}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                ) : (
                  <Feather
                    name="arrow-up"
                    size={25}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                )
              ) : null}
            </View>
            <ThisWeekCardView
              minimizeCard={this.state.minimizeCard}
              {...this.props}
            />
          </Card>
        </TouchableOpacity>
        {/* ) : null} */}
      </View>
    );
  }
}
