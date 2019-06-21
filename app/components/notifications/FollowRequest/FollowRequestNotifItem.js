import React from "react";
import { Thumbnail, Button } from "native-base";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import firebase from "../../../firebase/firebase";
import ThisWeekCardView from "../ThisWeek/ThisWeekCardView";
import Avatar from "../../Avatar/Avatar";
import EventsActions from "../../../actions/eventsActions";

export default class FollowsRequestNotifItem extends React.Component {
  async loadEvent(event_id) {
    await EventsActions.LOAD_UNIQUE_EVENT(event_id).then(
      // event => console.log(event)
      event =>
        this.props.navigation.navigate("EventView", {
          currentEvent: event
        })
    );
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.notif.type === "new_friend"
            ? this.props.navigation.navigate("ProfileView", {
                user_uid: this.props.notif.user.uid
              })
            : this.props.notif.type === "event_created"
            ? this.loadEvent(this.props.notif.event.uid)
            : console.log(this.props.notif.type)
        }
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: this.props.i === 0 ? 20 : 0,
            marginBottom:
              this.props.i + 1 === this.props.notifications.length ? 0 : 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              width={50}
              height={50}
              user={{
                uid: this.props.notif.user.uid,
                avatar: this.props.notif.user.avatar
              }}
              {...this.props}
              marginLeft={0}
            />
            <View style={{ flexDirection: "row", marginLeft: 10, width: 170 }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                {this.props.notif.user.username ===
                firebase.auth.currentUser.displayName
                  ? "You"
                  : this.props.notif.user.username}
                {this.props.notif.type === "follow_request_accepted" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    has accepted your request !
                  </Text>
                ) : this.props.notif.type === "new_friend" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    become your friend !
                  </Text>
                ) : this.props.notif.type === "event_created" ? (
                  <Text style={{ fontWeight: "normal" }}>
                    {" "}
                    just created a event
                  </Text>
                ) : null}
              </Text>
            </View>
          </View>
          <View>
            <Button
              rounded
              bordered
              style={{
                borderColor:
                  this.props.notif.type === "event_created"
                    ? "#364EE1"
                    : "#1DC161",
                paddingHorizontal: 10,
                height: 28,
                alignItems: "center"
              }}
              // onPress={() => console.log("🍕")}
            >
              <Text
                style={{
                  fontSize: 13,
                  color:
                    this.props.notif.type === "event_created"
                      ? "#364EE1"
                      : "#1DC161"
                }}
              >
                {this.props.notif.type === "event_created" ? "Event" : "Friend"}
              </Text>
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
