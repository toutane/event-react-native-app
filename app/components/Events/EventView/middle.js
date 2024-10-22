import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import firebase from "../../../firebase/firebase";

export default class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreView: false
    };
  }
  deleteEventFunction = async id => {
    await this.props.navigation.navigate("Home");
    firebase.db
      .collection("events")
      .doc(id)
      .delete()
      .then(() => console.log("event deleted"));
  };
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
            <View style={{ flexDirection: "row" }}>
              <Button
                rounded
                style={{
                  marginRight: 5,
                  paddingHorizontal: 10,
                  height: 28,
                  marginTop: 7,
                  backgroundColor: "#FE245D"
                }}
                onLongPress={
                  () => this.deleteEventFunction(this.props.currentEvent.id)
                  // firebase.db
                  //   .collection("events")
                  //   .doc(this.props.currentEvent.id)
                  //   .delete()
                  //   .then(() => this.props.navigation.navigate("Home"))
                  // console.log(this.props.currentEvent.id)
                }
              >
                <Text style={{ color: "white" }}>delete</Text>
              </Button>
              <Button
                transparent
                style={{
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Feather name="settings" size={25} color="#797979" />
              </Button>
            </View>
          ) : (
            <Button
              transparent
              style={{
                height: 40,
                width: 40,
                marginBottom: 7,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() =>
                this.setState({ moreView: !this.state.moreView }, () =>
                  console.log(this.state.moreView)
                )
              }
            >
              <Feather name="more-vertical" size={25} color="#797979" />
            </Button>
          )}
        </View>
        {this.state.moreView ? (
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            sit, cumque eligendi veniam nesciunt aliquid atque consequatur
            perspiciatis facilis. Praesentium delectus velit vel placeat commodi
            tempore, iure libero fugiat hic.
          </Text>
        ) : null}
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
