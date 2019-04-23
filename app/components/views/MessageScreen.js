import React from "react";
import { ScrollView, StyleSheet, View, Animated, Text } from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Card } from "../Card/styles";
import { Button } from "native-base";
import { Icon } from "expo";
import { theme } from "../../themes";

const tab = [
  "Bonjour",
  "Bonsoir",
  "Bonjour",
  "Bonsoir",
  "Bonsoir",
  "Bonjour",
  "Bonsoir",
  "Bonsoir",
  "Bonjour",
  "Bonsoir"
];

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 52;
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
            {tab.map((e, i) => (
              <Card key={i} style={{ marginBottom: 20 }}>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, vitae quas dignissimos esse animi distinctio soluta
                  quaerat! Veritatis eveniet inventore laudantium nesciunt
                  minima vel, quibusdam perspiciatis eligendi ratione sapiente
                  quia?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, vitae quas dignissimos esse animi distinctio soluta
                  quaerat! Veritatis eveniet inventore laudantium nesciunt
                  minima vel, quibusdam perspiciatis eligendi ratione sapiente
                  quia?
                </Text>
              </Card>
            ))}
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
            headerFrom={"#E55A34"}
            headerTo={"#EC7034"}
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
                  Messages.
                </Animated.Text>
                <Animated.View
                  style={{
                    top: AnimatedButtonsPosition,
                    position: "absolute"
                  }}
                >
                  <Button
                    transparent
                    style={{
                      height: 60,
                      left: screenWidth - 80,
                      position: "absolute"
                    }}
                  >
                    <Icon.Feather name="plus" size={40} color="white" />
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
