import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { Card } from "../Card/styles";
import EventInfo from "./EventInfo";
import firebase from "../../firebase/firebase";
import Avatar from "../Avatar/Avatar";

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
            <Avatar
              key={0}
              user={{
                uid: this.props.currentEvent.organizer.uid,
                avatar: this.props.currentEvent.organizer.avatar
              }}
              marginLeft={0}
              {...this.props}
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
                  ? this.props.currentEvent.event.title.slice(0, 12) + "..."
                  : this.props.currentEvent.event.title.length > 20
                  ? this.props.currentEvent.event.title.slice(0, 17) + "..."
                  : this.props.currentEvent.event.title}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.currentEvent.organizer.uid ===
                  firebase.auth.currentUser.uid
                    ? this.props.navigation.navigate("Profile")
                    : this.props.navigation.navigate("ProfileView", {
                        user_uid: this.props.currentEvent.organizer.uid
                      })
                }
              >
                <Text
                  style={{ marginLeft: 15, fontSize: 16, color: "#797979" }}
                >
                  {"by "}
                  <Text
                    style={
                      this.props.currentEvent.organizer.uid ===
                      firebase.auth.currentUser.uid
                        ? {
                            color: "#364EE1"
                            // color: "black",
                            // fontWeight: "bold"
                          }
                        : { color: "#797979" }
                    }
                  >
                    {this.props.currentEvent.organizer.username.length > 18
                      ? this.props.currentEvent.organizer.username.slice(
                          0,
                          15
                        ) + "..."
                      : this.props.currentEvent.organizer.username}
                  </Text>
                </Text>
              </TouchableOpacity>
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
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              {this.props.currentEvent.event.badge.map((wrd, i) => (
                <Button
                  key={i}
                  rounded
                  style={{
                    marginRight: 7,
                    paddingHorizontal: 10,
                    height: 26,
                    backgroundColor: "#364EE1"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>{wrd}</Text>
                </Button>
              ))}
            </View>
          </View>
          <EventInfo currentEvent={this.props.currentEvent} />
        </Card>
      </TouchableOpacity>
    );
  }
}
