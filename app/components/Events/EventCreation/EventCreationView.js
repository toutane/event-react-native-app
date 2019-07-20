import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Thumbnail, Badge } from "native-base";
import { screenWidth } from "../../../utils/dimensions";
import { LinearGradient } from "expo";
import Header from "./Header";
import MiddleCreation from "./Middle";
import MiddleView2 from "./MiddleView2";
import Event_CreationInfo from "./Info";
import MembersView from "./MembersView";
import Swiper from "react-native-swiper";
import firebase from "../../../firebase/firebase";
import EventsActions from "../../../actions/eventsActions";
import UsersActions from "../../../actions/usersActions";
const moment = require("moment");

export default class EventCreationView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 380,
      organizer_uid: firebase.auth.currentUser.uid,
      organizer_username: firebase.auth.currentUser.displayName,
      organizer_avatar: "null",
      title: "",
      text: "",
      badge: [],
      invited_participants: [],
      selectedUsers: [],
      starts: { date: new Date(), time: new Date() },
      ends: {
        date: new Date(),
        time: new Date()
      },
      isFullDay: false,
      // date: new Date(),
      // starts: new Date(),
      isStartsPickerVisible: false,
      isEndsPickerVisible: false,
      location: { description: "search location" },
      add_info: {}
    };
  }
  componentDidMount() {
    UsersActions.GET_USER_AVATAR(firebase.auth.currentUser.uid).then(avatar =>
      this.setState({ organizer_avatar: avatar })
    );
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

  handleEndsPicked = ends => {
    this.setState({ ends: { date: ends, time: ends } });
    this.hideEndsPicker();
  };
  showEndsPicker = () => {
    this.setState({ isEndsPickerVisible: true });
  };

  hideEndsPicker = () => {
    this.setState({ isEndsPickerVisible: false });
  };
  handleStartsPicked = starts => {
    this.setState({ starts: { date: starts, time: starts } });
    this.hideStartsPicker();
  };
  showStartsPicker = () => {
    this.setState({ isStartsPickerVisible: true });
  };

  hideStartsPicker = () => {
    this.setState({ isStartsPickerVisible: false });
  };
  setUpLocation = (location, add_info) => {
    this.setState(
      {
        location: location,
        add_info: add_info,
        swiperHeight:
          this.state.add_info.entry_code !== "" ||
          this.state.add_info.intercom !== "" ||
          this.state.add_info.floor !== ""
            ? 420
            : 380
      },
      () => console.log(this.state.add_info)
    );
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
      if (!firebase.auth.currentUser) {
        return alert("Not authorized");
      }
      const newEvent = await firebase.db
        .collection("events")
        .add({
          event: {
            title: state.title,
            text: state.text,
            badge: state.badge,
            isFullDay: state.isFullDay,
            starts: {
              date: moment(state.starts.date).format("ll"),
              time: moment(state.starts.time).format("LT")
            },
            ends: {
              date: moment(state.ends.date).format("ll"),
              time: moment(state.ends.date).format("LT")
            },
            // date: moment(state.date).format("D/MM"),
            location: { ...state.location, ...state.add_info }
          },
          organizer: {
            uid: state.organizer_uid,
            username: state.organizer_username,
            avatar: state.organizer_avatar
          },
          participants: state.invited_participants
          // id: doc.id
        })
        .then(event => {
          EventsActions.EVENT_CREATED_NOTIFICATION(
            {
              uid: state.organizer_uid,
              username: state.organizer_username,
              avatar: state.organizer_avatar
            },
            [{ uid: state.organizer_uid }].concat(state.invited_participants),
            event.id
          );
          props.navigation.navigate("Home");
        });
    }
    return (
      <View>
        <ScrollView style={{ zIndex: 1 }} scrollEventThrottle={1}>
          <View style={[styles.headerBox, { zIndex: 99 }]}>
            <View style={{ marginTop: 45 }}>
              <Header
                {...this.props}
                createNewEvent={() => createNewEvent(this.props, this.state)}
                // createNewEvent={() =>
                //   NotifsActions.EVENT_CREATED_NOTIFICATION(
                //     {
                //       uid: this.state.organizer_uid,
                //       username: this.state.organizer_username,
                //       avatar: this.state.organizer_avatar
                //     },
                //     [{ uid: this.state.organizer_uid }].concat(
                //       this.state.invited_participants
                //     )
                //   )
                // }
                title={this.state.title}
              />
              <Swiper
                style={{ height: this.state.swiperHeight }}
                showsPagination={false}
                loop={false}
                // horizontal={false}
              >
                <MiddleCreation
                  {...this.props}
                  setInputsStates={(stateContent, stateName) =>
                    this.setInputsStates(stateContent, stateName)
                  }
                  add_info={this.state.add_info}
                  username={this.state.organizer_username}
                  badge={this.state.badge}
                  addBadge={() => this.addBadge()}
                  addBadgeValue={(e, index) => this.addBadgeValue(e, index)}
                  filterBadge={() => this.filterBadge()}
                  location={this.state.location}
                  setUpLocation={(data, add_info) =>
                    this.setUpLocation(data, add_info)
                  }
                  starts={this.state.starts}
                  ends={this.state.ends}
                  handleStartsPicked={starts => this.handleStartsPicked(starts)}
                  isVisibleStarts={this.state.isStartsPickerVisible}
                  showStartsPicker={this.showStartsPicker}
                  hideStartsPicker={this.hideStartsPicker}
                  handleEndsPicked={ends => this.handleEndsPicked(ends)}
                  isVisibleEnds={this.state.isEndsPickerVisible}
                  showEndsPicker={this.showEndsPicker}
                  hideEndsPicker={this.hideEndsPicker}
                  isFullDay={this.state.isFullDay}
                  handleFullDay={() =>
                    this.setState({
                      isFullDay: !this.state.isFullDay
                    })
                  }
                />
                {/*   */}
              </Swiper>
              {/* <Event_CreationInfo
                {...this.props}
                time={this.state.time}
                handleStartsPicked={time => this.handleStartsPicked(time)}
                isVisibleStarts={this.state.isStartsPickerVisible}
                showStartsPicker={this.showStartsPicker}
                hideStartsPicker={this.hideStartsPicker}
                date={this.state.date}
                handleEndsPicked={date => this.handleEndsPicked(date)}
                isVisibleDate={this.state.isEndsPickerVisible}
                showEndsPicker={this.showEndsPicker}
                hideEndsPicker={this.hideEndsPicker}
                location={this.state.location}
                setUpLocation={location => this.setUpLocation(location)}
              /> */}
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
