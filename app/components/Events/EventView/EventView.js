import React from "react";
import { StyleSheet, View } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import Header from "./header";
import Middle from "./middle";
import Info from "./eventInfo";
import MiddleView from "./MiddleView";
import { LinearGradient } from "expo";
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
      .doc(
        // "xaOVk0le1NT800gW90tQ"
        this.props.navigation.getParam("currentEvent").id
      )
      .get();
    return this.setState(
      {
        currentEvent: currentEvent.data()
        // .docs.map(doc => ({
        //   ...doc.data()
        // })
        // )
      },
      () => console.log("updating event list")
    );
  }
  render() {
    return (
      <View>
        <View style={[styles.headerBox, { zIndex: 9 }]}>
          <View style={{ marginTop: 45 }}>
            <Header currentEvent={this.state.currentEvent} {...this.props} />
            <Middle currentEvent={this.state.currentEvent} {...this.props} />
            <Info currentEvent={this.state.currentEvent} {...this.props} />
          </View>
        </View>
        <MiddleView
          style={{ zIndex: 5 }}
          currentEvent={this.state.currentEvent}
          eventsFilter={this.props.navigation.getParam("eventsFilter")}
          {...this.props}
        />
        <View style={{ backgroundColor: "#158E47", zIndex: 0, height: 500 }}>
          <LinearGradient
            colors={["#158E47", "#1DC161"]}
            style={{
              height: "100%",
              width: screenWidth
            }}
          />
        </View>
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
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.15,
    shadowRadius: 15
  }
});
