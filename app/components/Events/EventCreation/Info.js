import React from "react";
import { View, Text } from "react-native";
import { Icon } from "expo";
import { Hr } from "../../Hr/styles";
import Event_DatePicker from "./DatePicker";
const moment = require("moment");

moment.locale("fr");
export default class Event_CreationInfo extends React.Component {
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
                  color: "#fead01",
                  fontWeight: "600"
                }}
              >
                {this.props.time}
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
                  color: "#fead01",
                  fontWeight: "600"
                }}
                onPress={this.props.showDateTimePicker}
              >
                {moment(this.props.date).format("L")}
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
                  color: "#fead01",
                  fontWeight: "600"
                }}
              >
                {this.props.location.length > 5
                  ? this.props.location.slice(0, 4) + "..."
                  : this.props.location}
              </Text>
            </View>
          </View>
        </View>
        <Event_DatePicker {...this.props} />
      </View>
    );
  }
}
