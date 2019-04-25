import React from "react";
import { StyleSheet, View } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import Header from "./header";
import Middle from "./middle";
import Info from "./eventInfo";
import MiddleView from "./MiddleView";
import { LinearGradient } from "expo";

export default class EventView extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View>
        <View style={[styles.headerBox, { zIndex: 9 }]}>
          <View style={{ marginTop: 45 }}>
            <Header
              currentEvent={this.props.navigation.getParam("currentEvent")}
              {...this.props}
            />
            <Middle
              currentEvent={this.props.navigation.getParam("currentEvent")}
              {...this.props}
            />
            <Info
              currentEvent={this.props.navigation.getParam("currentEvent")}
              {...this.props}
            />
          </View>
        </View>
        <MiddleView
          style={{ zIndex: 5 }}
          currentEvent={this.props.navigation.getParam("currentEvent")}
          {...this.props}
        />
        <View style={{ backgroundColor: "#158E47", zIndex: 0, height: 500 }}>
          <LinearGradient
            colors={["#158E47", "#1DC161"]}
            // start={[1, 0]}
            // end={[0, 1]}
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
