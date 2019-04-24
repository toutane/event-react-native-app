import React from "react";
import { ScrollView, StyleSheet, View, Animated, Text } from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Button } from "native-base";
import { Icon } from "expo";
import { theme } from "../../themes";
import EventsList from "../Events/EventsList/index";

const Header_Maximum_Height = 280;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 62;
const Header_Minimum_Text = 35;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 30;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -20;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();

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
          <View style={{ marginTop: 90 }}>
            <EventsList />
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
            headerFrom={"#2B4CF2"}
            headerTo={"#506CF2"}
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
                    top: AnimatedButtonsPosition,
                    position: "absolute"
                  }}
                >
                  <Button
                    style={{
                      marginTop: 10,
                      height: 50,
                      width: 50,
                      borderRadius: 15,
                      left: screenWidth - 80,
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      justifyContent: "center"
                    }}
                  >
                    <Icon.Feather
                      name="more-vertical"
                      size={35}
                      color="white"
                    />
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
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.grey,
    fontFamily: "Arial"
  }
});
