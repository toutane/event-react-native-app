import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Thumbnail, Badge, Button } from "native-base";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
import firebase from "../../../firebase/firebase";
import ConfirmQuit from "./confirmQuit";

export default class MiddleView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      confirmView: false
    };
  }
  componentDidMount() {
    firebase
      .getCurrentUserAvatar()
      .then(avatar => this.setState({ avatar: avatar }));
  }
  quitEventFunction(event, avatar) {
    firebase.db
      .collection("events")
      .doc(event.id)
      .update({
        participants: event.participants
          .filter(part => part.uid !== firebase.auth.currentUser.uid)
          .concat({
            uid: firebase.auth.currentUser.uid,
            username: firebase.auth.currentUser.displayName,
            avatar: avatar,
            state: "waiting"
          })
      })
      .then(() => this.setState({ confirmView: false }));

    console.log("event quited...");
  }
  render() {
    async function joinEventFunction(event, avatar) {
      firebase.db
        .collection("events")
        .doc(event.id)
        .update({
          participants: event.participants
            .filter(part => part.uid !== firebase.auth.currentUser.uid)
            .concat({
              uid: firebase.auth.currentUser.uid,
              username: firebase.auth.currentUser.displayName,
              avatar: avatar,
              state: "available"
            })
        });
      console.log("trying to join the event...");
    }
    return (
      <View style={{ backgroundColor: "#158E47" }}>
        <View style={styles.headerBox}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 28
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                The participants{" "}
                <Text
                  style={{ fontSize: 16, color: "#797979", fontWeight: "500" }}
                >
                  (
                  {1 +
                    this.props.currentEvent.participants.filter(
                      part => part.state === "available"
                    ).length}
                  /{1 + this.props.currentEvent.participants.length})
                </Text>
              </Text>
              {this.props.currentEvent.participants.find(
                part =>
                  part.uid === firebase.auth.currentUser.uid &&
                  part.state === "available"
              ) ? (
                this.props.currentEvent.organizer.uid !==
                firebase.auth.currentUser.uid ? (
                  <ConfirmQuit
                    quitEventFunction={(event, avatar) =>
                      this.quitEventFunction(event, avatar)
                    }
                    currentEvent={this.props.currentEvent}
                    avatar={this.state.avatar}
                  />
                ) : null
              ) : null}
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View>
                <Thumbnail
                  source={{ uri: this.props.currentEvent.organizer.avatar }}
                  style={{
                    borderRadius: 13,
                    width: 45,
                    height: 45
                  }}
                />
                <Badge
                  primary
                  style={{
                    backgroundColor: "#1DC161",
                    position: "absolute",
                    top: 35,
                    right: -4,
                    width: 10,
                    height: 12
                  }}
                />
              </View>
              {this.props.currentEvent.participants
                .filter(part => part.state === "available")
                .slice(0, 4)
                .map((participants, i) => (
                  <Thumbnail
                    key={i}
                    source={{ uri: participants.avatar }}
                    style={{
                      borderRadius: 13,
                      width: 45,
                      height: 45,
                      marginLeft: 8
                    }}
                  />
                ))}
              {this.props.currentEvent.participants.filter(
                part => part.state === "available"
              ).length > 4 ? (
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
                    {this.props.currentEvent.participants.filter(
                      part => part.state === "available"
                    ).length - 4}
                  </Text>
                </View>
              ) : null}
            </View>
            {this.props.currentEvent.participants.find(
              part =>
                part.uid === firebase.auth.currentUser.uid &&
                part.state === "waiting"
            ) ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
              >
                <Button
                  style={{
                    borderRadius: 13,
                    backgroundColor: "#fead01",
                    width: 45,
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() =>
                    joinEventFunction(
                      this.props.currentEvent,
                      this.state.avatar
                    )
                  }
                >
                  <Icon.Feather name="plus" size={25} color="white" />
                </Button>
                <Text
                  style={{
                    marginLeft: 15,
                    color: "#fead01",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  Join event
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: screenWidth,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white"
  }
});
