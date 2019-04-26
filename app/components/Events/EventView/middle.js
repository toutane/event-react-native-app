import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import { Icon } from "expo";
import firebase from "../../../firebase/firebase";

export default class Middle extends React.Component {
  render() {
    return (
      <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
        <Text style={styles.mainTitle}>
          {this.props.currentEvent.event.title}
        </Text>
        <Text style={styles.subTitle}>
          {this.props.currentEvent.event.text}
        </Text>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {this.props.currentEvent.event.badge.map((wrd, i) => (
              <Button
                key={i}
                rounded
                style={{
                  marginRight: 7,
                  paddingHorizontal: 10,
                  height: 28,
                  backgroundColor: "#364EE1"
                }}
              >
                <Text style={{ color: "white" }}>{wrd}</Text>
              </Button>
            ))}
          </View>
          {this.props.currentEvent.organizer.uid ===
          firebase.auth.currentUser.uid ? (
            <Button
              transparent
              style={{
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon.Feather name="settings" size={25} color="#797979" />
            </Button>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 30,
    fontSize: 45,
    fontWeight: "bold",
    color: "black"
  },
  subTitle: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 27,
    color: "black",
    fontFamily: "Arial"
  }
});
