import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import { LinearGradient } from "expo";
import Header from "./Header";
import MiddleCreation from "./Middle";
import Event_CreationInfo from "./Info";

export default class EventCreationView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      badge: [],
      date: new Date(),
      isDateTimePickerVisible: false,
      // date: [],
      time: "00:00",
      location: "..."
    };
  }

  setInputsStates(stateContent, stateName) {
    this.setState({ [stateName]: stateContent }, () =>
      console.log(this.state.title)
    );
  }

  handleDatePicked = date => {
    this.setState(
      { date: date },
      console.log("A date has been picked: ", date)
    );
    this.hideDateTimePicker();
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  render() {
    return (
      <View>
        <ScrollView style={{ zIndex: 1 }} scrollEventThrottle={1}>
          <View style={[styles.headerBox, { zIndex: 99 }]}>
            <View style={{ marginTop: 45 }}>
              <Header {...this.props} />
              <MiddleCreation
                setInputsStates={(stateContent, stateName) =>
                  this.setInputsStates(stateContent, stateName)
                }
              />
              <Event_CreationInfo
                time={this.state.time}
                date={this.state.date}
                handleDatePicked={date => this.handleDatePicked(date)}
                isVisible={this.state.isDateTimePickerVisible}
                showDateTimePicker={this.showDateTimePicker}
                hideDateTimePicker={this.hideDateTimePicker}
                location={this.state.location}
              />
            </View>
          </View>
          <View style={{ zIndex: 20 }}>
            <Text>{this.state.title}</Text>
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
