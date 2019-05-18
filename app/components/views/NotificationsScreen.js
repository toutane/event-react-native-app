import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity
} from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";

// const Header_Maximum_Height = 150;
// const Header_Minimum_Height = 100;
const Header_Maximum_Text = 35;
const Header_Minimum_Text = 35;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 30;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -5;
const Header_Maximum_Event_Filter_Pos = 150;
const Header_Minimum_Event_Filter_Pos = -5;

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  render() {
    // const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
    //   inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

    //   outputRange: [Header_Maximum_Height, Header_Minimum_Height],

    //   extrapolate: "clamp"
    // });

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
          style={{ zIndex: 1, top: 0 }}
          scrollEventThrottle={16}
          onScroll={scrollAnimation}
        >
          <View
            style={{
              marginTop: 130,
              height: 900,
              backgroundColor: "#fff",
              shadowOpacity: 0.1,
              shadowRadius: 20,
              shadowColor: "rgba(0, 0, 0, 1)",
              paddingVertical: 30,
              paddingHorizontal: 25,
              borderTopRightRadius: 35,
              borderTopLeftRadius: 35
            }}
          />
        </ScrollView>
        <Animated.View
          style={[
            styles.headerBox,
            {
              // height: AnimateHeaderHeight,
              height: 300,
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
            position: "absolute"
          }}
        >
          <View
            style={{
              flexDirection: "row"
            }}
          >
            {/* <View style={{ zIndex: 10, flexDirection: "collum" }}> */}
            <Animated.Text
              style={[
                styles.mainTitle,
                {
                  fontSize: AnimateHeaderText
                }
              ]}
            >
              2 Notifications
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
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon.Feather name="bell" size={30} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
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
