import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Hr } from "../../Hr/styles";
import Event_EndsPicker from "./EndsPicker";
import Event_StartsPicker from "./StartsPicker";
import LocationPicker from "./LocationPicker";
const moment = require("moment");

export default class Event_CreationInfo extends React.Component {
  state = { showLocation: false };
  render() {
    return (
      <View>
        {/* <Hr style={{ marginLeft: 0, marginRight: 0 }} /> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            paddingHorizontal: 25,
            justifyContent: "space-between"
          }}
        >
          {this.state.showLocation ? null : (
            <TouchableOpacity onPress={this.props.showTimePicker}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <Feather
                  name="clock"
                  size={30}
                  color="rgba(0, 0, 0, 0.2)"
                /> */}
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    Starts
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "#1DC161",
                      fontWeight: "600"
                    }}
                  >
                    {moment(this.props.time).format("ll    LT")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {this.state.showLocation ? null : (
            <TouchableOpacity onPress={this.props.showDatePicker}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <Feather
                  name="calendar"
                  size={30}
                  color="rgba(0, 0, 0, 0.2)"
                /> */}
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    Ends
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "#1DC161",
                      fontWeight: "600"
                    }}
                    onPress={this.props.showDatePicker}
                  >
                    {moment(this.props.date).format("ll    LT")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("LocationPicker", {
                setUpLocation: data => this.props.setUpLocation(data)
              })
            }
            onLongPress={
              this.props.location.description !== ""
                ? () =>
                    this.setState({
                      showLocation: !this.state.showLocation
                    })
                : () => console.log("long press dans le vide")
            }
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="map-pin" size={30} color="rgba(0,0,0,0.2)" />
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
                    color: "#1DC161",
                    fontWeight: "600"
                  }}
                >
                  {this.props.location.description !== ""
                    ? this.state.showLocation
                      ? this.props.location.description
                      : this.props.location.description.length > 5
                      ? this.props.location.description.slice(0, 4) + "..."
                      : this.props.location.description
                    : "Where ?"} 
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
        <Event_EndsPicker {...this.props} />
        <Event_StartsPicker {...this.props} />
      </View>
    );
  }
}
