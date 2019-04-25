import React from "react";
import { ScrollView, StyleSheet, View, Animated, Text } from "react-native";
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eventsFilter: "all events"
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
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
          <View style={{ marginTop: 100 }}>
            <EventsList {...this.props} />
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
                <View style={{ flexDirection: "collum" }}>
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
                  <Animated.View
                    style={{
                      flexDirection: "row",
                      opacity: AnimateHeaderSubtitle
                    }}
                  >
                    <Button
                      rounded
                      style={[
                        this.state.eventsFilter === "all events" ? styles.activeEventBtn : 
                        styles.eventBtn
                        {
                          marginLeft: 30
                        }
                      ]}
                      onPress={() =>
                        this.setState({ eventsFilter: "all events" })
                      }
                    >
                      <Text style={{ color: "#158E47", fontSize: 14 }}>
                        all events
                      </Text>
                    </Button>
                    <Button
                      rounded
                      style={[
                        this.state.eventsFilter === "all events" ? styles.activeEventBtn : 
                        styles.eventBtn
                        {
                          marginLeft: 10
                        }
                      ]}
                      onPress={() =>
                        this.setState({ eventsFilter: "my events" })
                      }
                    >
                      <Text style={{ color: "#158E47", fontSize: 14 }}>
                        my events
                      </Text>
                    </Button>
                  </Animated.View>
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
  activeEventBtn : {
    paddingHorizontal: 8,
    marginTop: 3,
    height: 28,
    backgroundColor: "#F9F0DB"
  }
});
