import React from "react";
import { View, Text } from "react-native";
import { Icon } from "expo";
import { Hr } from "../Hr/styles";

export default class EventInfo extends React.Component {
  render() {
    return (
      <View>
        <Hr style={{ marginLeft: 0, marginRight: 0 }} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            paddingHorizontal: 25,
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon.Feather name="clock" size={30} color="rgba(0, 0, 0, 0.2)" />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: "#797979",
                  fontWeight: "500"
                }}
              >
                Time
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: "black",
                  fontWeight: "600"
                }}
              >
                {this.props.currentEvent.event.time}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon.Feather
              name="calendar"
              size={30}
              color="rgba(0, 0, 0, 0.2)"
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: "#797979",
                  fontWeight: "500"
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: "black",
                  fontWeight: "600"
                }}
              >
                {this.props.currentEvent.event.date}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon.Feather name="map-pin" size={30} color="rgba(0,0,0,0.2)" />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: "#797979",
                  fontWeight: "500"
                }}
              >
                Location
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: "black",
                  fontWeight: "600"
                }}
              >
                {this.props.currentEvent.event.location.length > 5
                  ? this.props.currentEvent.event.location.slice(0, 4) + "..."
                  : this.props.currentEvent.event.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
