import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

export default class ConfirmQuit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmView: false
    };
  }
  render() {
    return (
      <View>
        {this.state.confirmView === false ? (
          <Text
            style={{ fontSize: 16, color: "rgba(0,0,0,0.2)" }}
            onPress={() => this.setState({ confirmView: true })}
          >
            Quit ?
          </Text>
        ) : null}
        {this.state.confirmView ? (
          <View style={{ flexDirection: "row" }}>
            <Button
              rounded
              style={{
                marginRight: 7,
                paddingHorizontal: 10,
                height: 28,
                backgroundColor: "#1DC161"
              }}
              onPress={() =>
                this.props.quitEventFunction(
                  this.props.currentEvent,
                  this.props.avatar
                )
              }
            >
              <Text style={{ color: "white" }}>Yes</Text>
            </Button>
            <Button
              rounded
              style={{
                paddingHorizontal: 10,
                height: 28,
                backgroundColor: "#FE245D"
              }}
              onPress={() => this.setState({ confirmView: false })}
            >
              <Text style={{ color: "white" }}>No</Text>
            </Button>
          </View>
        ) : null}
      </View>
    );
  }
}
