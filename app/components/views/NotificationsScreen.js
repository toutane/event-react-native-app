import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button } from "native-base";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";
import NotificationsList from "../notifications/NotificationsList";

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 40;
const Header_Minimum_Text = 30;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 50;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -10;
const Header_Maximum_Event_Filter_Pos = 125;
const Header_Minimum_Event_Filter_Pos = -5;

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eventsFilter: 1
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
    this.setNewSlideIndex = this.setNewSlideIndex.bind(this);
  }
  setNewSlideIndex(i) {
    this.setState({ eventsFilter: i }, () => console.log(this.state));
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
    const scrollAnimation = Animated.event([
      {
        nativeEvent: {
          contentOffset: { y: this.AnimatedHeaderValue }
        }
      }
    ]);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ zIndex: 1, top: 100 }}
          scrollEventThrottle={16}
          onScroll={scrollAnimation}
        >
          <NotificationsList
            scrollAnimation={scrollAnimation}
            eventsFilter={this.state.eventsFilter}
            setNewSlideIndex={this.setNewSlideIndex}
            {...this.props}
          />
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
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 10,
            top: AnimatedTextPosition,
            position: "absolute",
            flexDirection: "row"
          }}
        >
          <Animated.Text
            style={[
              styles.mainTitle,
              {
                fontSize: AnimateHeaderText
              }
            ]}
          >
            Notifications
          </Animated.Text>
          <Animated.View
            style={{
              top: AnimatedButtonsPosition,
              position: "absolute"
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                left: screenWidth - 80,
                position: "absolute",
                borderRadius: 13,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() =>
                this.props.navigation.navigate("NotificationsView")
              }
            >
              <Icon.Feather name="bell" size={30} color="white" />
            </TouchableOpacity>
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
            onPress={() => this.setState({ disabled: !this.state.disabled })}
          >
            <Icon.Feather
              name="moon"
              size={28}
              color={this.state.disabled ? "#364EE1" : "white"}
              style={{ marginTop: 2, marginBottom: 3, marginLeft: 30 }}
            />
          </TouchableOpacity>
          <Button
            rounded
            style={
              this.state.eventsFilter === 0
                ? [styles.activeEventBtn, { marginLeft: 13 }]
                : [styles.eventBtn, { marginLeft: 13 }]
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
              following
            </Text>
          </Button>
          <Button
            rounded
            style={
              this.state.eventsFilter === 1
                ? [styles.activeEventBtn, { marginLeft: 13 }]
                : [styles.eventBtn, { marginLeft: 13 }]
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
              {" "}
              you
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
    fontSize: 35,
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
