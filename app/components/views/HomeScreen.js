import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity
} from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Button } from "native-base";
import { Icon } from "expo";
import { theme } from "../../themes";
import EventsList from "../Events/EventList";

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 50;
const Header_Minimum_Text = 35;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 30;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -5;
const Header_Maximum_Event_Filter_Pos = 150;
const Header_Minimum_Event_Filter_Pos = -5;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eventsFilter: 0,
      nbInvitation: 0
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }

  setNbInvitations(nb) {
    this.setState({ nbInvitation: nb });
  }
  setNewSlideIndex(i) {
    this.setState({ eventsFilter: i });
  }

  render() {
    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: [Header_Maximum_Height, Header_Minimum_Height],

      extrapolate: "clamp"
    });

    const AnimateHeaderText = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text - Header_Minimum_Text],

      outputRange: [Header_Maximum_Text, Header_Minimum_Text],

      extrapolate: "clamp"
    });
    const AnimateHeaderSubtitle = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Header_Maximum_Text_Opacity - Header_Minimum_Text_Opacity
      ],

      outputRange: [Header_Maximum_Text_Opacity, Header_Minimum_Text_Opacity],

      extrapolate: "clamp"
    });
    const AnimatedTextPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text_Pos - Header_Minimum_Text_Pos],

      outputRange: [Header_Maximum_Text_Pos, Header_Minimum_Text_Pos],

      extrapolate: "clamp"
    });
    const AnimatedButtonsPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Buttons_Pos - Header_Minimum_Buttons_Pos],

      outputRange: [Header_Maximum_Buttons_Pos, Header_Minimum_Buttons_Pos],

      extrapolate: "clamp"
    });
    const EventFilterPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Header_Maximum_Event_Filter_Pos - Header_Minimum_Event_Filter_Pos
      ],

      outputRange: [
        Header_Maximum_Event_Filter_Pos,
        Header_Minimum_Event_Filter_Pos
      ],

      extrapolate: "clamp"
    });

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ zIndex: 1, top: 100 }}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: this.AnimatedHeaderValue }
              }
            }
          ])}
        >
          <View style={{ zIndex: 1, marginTop: 100 }}>
            <EventsList
              {...this.props}
              eventsFilter={this.state.eventsFilter}
              setNbInvitations={nb => this.setNbInvitations(nb)}
              setNewSlideIndex={newIndex => this.setNewSlideIndex(newIndex)}
            />
          </View>
        </ScrollView>
        <Animated.View
          style={[
            styles.headerBox,
            {
              height: AnimateHeaderHeight,
              width: screenWidth
            }
          ]}
        >
          <HeaderGradient
            width={screenWidth}
            headerFrom={"#158E47"}
            headerTo={"#1DC161"}
          />
          <Animated.View
            style={{
              top: AnimatedTextPosition,
              position: "absolute"
            }}
          >
            <View>
              <Animated.Text
                style={[styles.subtitle, { opacity: AnimateHeaderSubtitle }]}
              >
                MARDI 23 AVRIL
              </Animated.Text>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <View style={{ zIndex: 10, flexDirection: "collum" }}>
                  <Animated.Text
                    style={[
                      styles.mainTitle,
                      {
                        fontSize: AnimateHeaderText
                      }
                    ]}
                  >
                    Home
                  </Animated.Text>
                </View>
                <Animated.View
                  style={{
                    top: AnimatedButtonsPosition,
                    position: "absolute"
                  }}
                >
                  <Button
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 13,
                      left: screenWidth - 80,
                      position: "absolute",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      justifyContent: "center"
                    }}
                  >
                    <Icon.Feather name="bell" size={30} color="white" />
                  </Button>
                </Animated.View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 10,
            flexDirection: "row",
            position: "absolute",
            top: EventFilterPosition,
            alignItems: "center",
            opacity: AnimateHeaderSubtitle
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EventCreationView")}
          >
            <Icon.Feather
              name="plus-circle"
              size={28}
              color="white"
              style={{ marginTop: 2, marginBottom: 3, marginLeft: 30 }}
            />
          </TouchableOpacity>
          <Button
            rounded
            style={
              this.state.eventsFilter === 0
                ? [styles.activeEventBtn, { marginLeft: 10 }]
                : [styles.eventBtn, { marginLeft: 10 }]
            }
            onPress={() => this.setState({ eventsFilter: 0 })}
          >
            <Text
              style={
                this.state.eventsFilter === 0
                  ? { color: "#fead01", fontSize: 14 }
                  : { color: "#158E47", fontSize: 14 }
              }
            >
              my events
            </Text>
          </Button>
          <Button
            rounded
            style={
              this.state.eventsFilter === 1
                ? [styles.activeEventBtn, { marginLeft: 10 }]
                : [styles.eventBtn, { marginLeft: 10 }]
            }
            onPress={() => this.setState({ eventsFilter: 1 })}
          >
            <Text
              style={
                this.state.eventsFilter === 1
                  ? { color: "#fead01", fontSize: 14 }
                  : { color: "#158E47", fontSize: 14 }
              }
            >
              all events
            </Text>
          </Button>

          <Button
            rounded
            style={
              this.state.eventsFilter === 2
                ? [styles.activeEventBtn, { marginLeft: 10 }]
                : [styles.eventBtn, { marginLeft: 10 }]
            }
            onPress={() => this.setState({ eventsFilter: 2 })}
          >
            <Text
              style={
                this.state.eventsFilter === 2
                  ? { color: "#fead01", fontSize: 14 }
                  : { color: "#158E47", fontSize: 14 }
              }
            >
              <Text
                style={
                  this.state.nbInvitation !== 0
                    ? { color: "#364EE1", fontWeight: "bold" }
                    : null
                }
              >
                {this.state.nbInvitation}
              </Text>
              {this.state.nbInvitation === 0 || 1
                ? " invitation"
                : " invitations"}
            </Text>
          </Button>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    position: "absolute",
    zIndex: 0,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.15,
    shadowRadius: 15
  },
  mainTitle: {
    marginLeft: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)"
  },
  subtitle: {
    marginLeft: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.grey,
    fontFamily: "Arial"
  },
  eventBtn: {
    paddingHorizontal: 8,
    marginTop: 3,
    height: 28,
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  activeEventBtn: {
    paddingHorizontal: 8,
    marginTop: 3,
    height: 28,
    backgroundColor: "rgba(249,240,219, 1)"
  }
});
