import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity
} from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";

const Header_Maximum_Height = 150;
const Header_Minimum_Height = 100;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 50;

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  render() {
    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: [Header_Maximum_Height, Header_Minimum_Height],

      extrapolate: "clamp"
    });
    const AnimatedTextPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text_Pos - Header_Minimum_Text_Pos],

      outputRange: [Header_Maximum_Text_Pos, Header_Minimum_Text_Pos],

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
        <Animated.View
          style={{
            zIndex: 1,
            top: AnimateHeaderHeight,
            width: screenWidth,
            position: "absolute",
            height: 900,
            backgroundColor: "#fff",
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowColor: "rgba(0, 0, 0, 1)",
            paddingHorizontal: 25,
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35
          }}
        >
          <ScrollView
            style={{ top: 0 }}
            scrollEventThrottle={16}
            onScroll={scrollAnimation}
          >
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 55, fontWeight: "bold" }}>
              Text
            </Text>
          </ScrollView>
        </Animated.View>
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
            <Animated.Text style={styles.mainTitle}>
              2 Notifications
            </Animated.Text>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                left: screenWidth - 80,
                top: -10,
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
