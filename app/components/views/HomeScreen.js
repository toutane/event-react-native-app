import React from "react";
import { ScrollView, StyleSheet, View, Animated, Text } from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";

const Header_Maximum_Height = 280;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 62;
const Header_Minimum_Text = 30;
const Header_Maximum_Text2 = 18;
const Header_Minimum_Text2 = 14;
const Header_Maximum_Text_Pos = 160;
const Header_Minimum_Text_Pos = 40;

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
    const AnimateHeaderText2 = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text2 - Header_Minimum_Text2],

      outputRange: [Header_Maximum_Text2, Header_Minimum_Text2],

      extrapolate: "clamp"
    });
    const AnimatedTextPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text_Pos - Header_Minimum_Text_Pos],

      outputRange: [Header_Maximum_Text_Pos, Header_Minimum_Text_Pos],

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
            {/* {tab.map((e, i) => (
              <Text key={i}>e</Text>
            ))} */}
          </View>
        </ScrollView>
        <Animated.View
          style={[
            styles.yellowBox,
            {
              height: AnimateHeaderHeight,
              width: screenWidth
            }
          ]}
        >
          <HeaderGradient width={screenWidth} />
          <Animated.View
            style={{
              top: AnimatedTextPosition,
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Animated.Text
                style={[
                  styles.text,
                  {
                    fontSize: AnimateHeaderText2
                  }
                ]}
              >
                Today, 1st April
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.text2,
                  {
                    fontSize: AnimateHeaderText
                  }
                ]}
              >
                Home
              </Animated.Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yellowBox: {
    position: "absolute",
    zIndex: 0,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.15,
    shadowRadius: 15
  },
  text: {
    marginLeft: 40,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontFamily: "Arial-BoldMT"
  },
  text2: {
    marginLeft: 40,
    backgroundColor: "transparent",
    fontFamily: "Arial-BoldMT",
    color: "rgba(255,255,255,1)"
  }
});
