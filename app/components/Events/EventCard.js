import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";
import { Card } from "../Card/styles";
import EventInfo from "./EventInfo";

// const event = this.props.currentEvent;

export default class EventCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("EventView", {
            currentEvent: this.props.currentEvent
          })
        }
      >
        <Card style={{ marginBottom: 20, paddingHorizontal: 0 }}>
          <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
            <Thumbnail
              source={{ uri: this.props.currentEvent.organizer.avatar }}
              style={{ borderRadius: 13, width: 50, height: 50 }}
            />
            {this.props.currentEvent.participants.length > 0 ? (
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
                  +{this.props.currentEvent.participants.length}
                </Text>
              </View>
            ) : null}
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                #{" "}
                {this.props.currentEvent.event.title.length > 15 &&
                this.props.currentEvent.participants.length !== 0
                  ? this.props.currentEvent.event.title.slice(0, 15) + "..."
                  : this.props.currentEvent.event.title.length > 22
                  ? this.props.currentEvent.event.title.slice(0, 22) + "..."
                  : this.props.currentEvent.event.title}
              </Text>
              <Text style={{ marginLeft: 15, fontSize: 16, color: "#797979" }}>
                {this.props.currentEvent.event.type}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              paddingHorizontal: 25
            }}
          >
            <Text style={{ lineHeight: 22, fontSize: 15 }}>
              {this.props.currentEvent.event.text.length > 120
                ? this.props.currentEvent.event.text.slice(0, 110) + "..."
                : this.props.currentEvent.event.text}
            </Text>
          </View>
          <EventInfo currentEvent={this.props.currentEvent} />
        </Card>
      </TouchableOpacity>
    );
  }
}
