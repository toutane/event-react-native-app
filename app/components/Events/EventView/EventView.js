import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import Header from "./header";
import Middle from "./middle";
import Info from "./eventInfo";
import MiddleView from "./MiddleView";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../../../firebase/firebase";

export default class EventView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      currentEvent: []
    };
  }
  componentWillMount() {
    this.setState(
      { currentEvent: this.props.navigation.getParam("currentEvent") },
      () => this.listenToChanges()
    );
  }

  async listenToChanges() {
    firebase.db
      .collection("events")
      .doc(this.props.navigation.getParam("currentEvent").id)
      .onSnapshot(() => this.loadEvents());
  }

  async loadEvents() {
    const currentEvent = await firebase.db
      .collection("events")
      .doc(this.props.navigation.getParam("currentEvent").id)
      .get();
    return this.setState(
      {
        currentEvent: {
          ...currentEvent.data(),
          ...{ id: this.props.navigation.getParam("currentEvent").id }
        }
      },
      () => console.log("updating event list")
    );
  }
  render() {
    return (
      <View>
        <ScrollView style={{ zIndex: 1 }} scrollEventThrottle={1}>
          <View style={[styles.headerBox, { zIndex: 99 }]}>
            <View style={{ marginTop: 45 }}>
              <Header currentEvent={this.state.currentEvent} {...this.props} />
              <Middle currentEvent={this.state.currentEvent} {...this.props} />
              <Info currentEvent={this.state.currentEvent} {...this.props} />
            </View>
          </View>
          <View style={{ zIndex: 20 }}>
            <MiddleView
              currentEvent={this.state.currentEvent}
              eventsFilter={this.props.navigation.getParam("eventsFilter")}
              {...this.props}
            />
          </View>
          <View
            style={{
              zIndex: 0,
              backgroundColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,1)",
              shadowOpacity: 0.5,
              shadowRadius: 15,
              height: 300
            }}
          >
            <LinearGradient
              colors={["#158E47", "#1DC161"]}
              style={{
                height: 300,
                width: screenWidth,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: screenWidth,
    paddingVertical: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.15,
    shadowRadius: 15
  }
});
