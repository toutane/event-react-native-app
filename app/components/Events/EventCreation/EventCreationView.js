import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Thumbnail, Badge } from "native-base";
import { screenWidth } from "../../../utils/dimensions";
import { LinearGradient } from "expo";
import Header from "./Header";
import MiddleCreation from "./Middle";
import Event_CreationInfo from "./Info";
import MembersView from "./MembersView";
import firebase from "../../../firebase/firebase";
const moment = require("moment");

export default class EventCreationView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      organizer_uid: firebase.auth.currentUser.uid,
      organizer_username: firebase.auth.currentUser.displayName,
      organizer_avatar: "null",
      title: "",
      text: "",
      badge: [],
      invited_participants: [],
      selectedUsers: [],
      date: new Date(),
      isDatePickerVisible: false,
      time: new Date(),
      isTimePickerVisible: false,
      location: { description: "" }
    };
  }
  componentDidMount() {
    firebase
      .getCurrentUserAvatar()
      .then(avatar => this.setState({ organizer_avatar: avatar }));
  }
  addParticipants(s_parts) {
    this.setState(
      {
        invited_participants: s_parts
      },
      console.log(
        "here the invited of this event : " + this.state.invited_participants
      )
    );
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
    this.hideDatePicker();
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleTimePicked = time => {
    this.setState(
      { time: time },
      console.log("A time has been picked: ", time)
    );
    this.hideTimePicker();
  };
  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };
  setUpLocation = location => {
    this.setState({ location: location });
  };
  addBadge() {
    this.setState({
      badge: [...this.state.badge, ""]
    });
  }
  addBadgeValue(e, index) {
    this.setState(
      {
        badge: [
          ...this.state.badge.slice(0, index),
          e,
          ...this.state.badge.slice(index + 1, this.state.badge.length)
        ]
      },
      () => console.log(this.state.badge)
    );
  }
  filterBadge() {
    this.setState({
      badge: this.state.badge.filter(e => !/^\s*$/.test(e))
    });
  }
  render() {
    async function createNewEvent(props, state) {
      await firebase
        .createNewEvent(
          {
            title: state.title,
            text: state.text,
            badge: state.badge,
            date: moment(state.date).format("D/MM"),
            time: moment(state.time).format("h:mm"),
            location: state.location.description
          },
          {
            uid: state.organizer_uid,
            username: state.organizer_username,
            avatar: state.organizer_avatar
          },
          state.invited_participants
        )
        .then(props.navigation.navigate("Home"));
    }
    return (
      <View>
        <ScrollView style={{ zIndex: 1 }} scrollEventThrottle={1}>
          <View style={[styles.headerBox, { zIndex: 99 }]}>
            <View style={{ marginTop: 45 }}>
              <Header
                {...this.props}
                createNewEvent={() => createNewEvent(this.props, this.state)}
              />
              <MiddleCreation
                setInputsStates={(stateContent, stateName) =>
                  this.setInputsStates(stateContent, stateName)
                }
                badge={this.state.badge}
                addBadge={() => this.addBadge()}
                addBadgeValue={(e, index) => this.addBadgeValue(e, index)}
                filterBadge={() => this.filterBadge()}
              />
              <Event_CreationInfo
                {...this.props}
                time={this.state.time}
                handleTimePicked={time => this.handleTimePicked(time)}
                isVisibleTime={this.state.isTimePickerVisible}
                showTimePicker={this.showTimePicker}
                hideTimePicker={this.hideTimePicker}
                date={this.state.date}
                handleDatePicked={date => this.handleDatePicked(date)}
                isVisibleDate={this.state.isDatePickerVisible}
                showDatePicker={this.showDatePicker}
                hideDatePicker={this.hideDatePicker}
                location={this.state.location}
                setUpLocation={location => this.setUpLocation(location)}
              />
            </View>
          </View>
          <View style={{ zIndex: 20 }}>
            <MembersView
              {...this.props}
              addParticipants={selected_participants =>
                this.addParticipants(selected_participants)
              }
              invited_participants={this.state.invited_participants}
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
