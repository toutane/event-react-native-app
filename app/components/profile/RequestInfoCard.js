import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";
import firebase from "../../firebase/firebase";
import UsersActions from "../../actions/usersActions";

const moment = require("moment");

const Yellow_Header_Maximum_Height = 100;
const Yellow_Header_Minimum_Height = 0;

export default class RequestInfoCard extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {}
  render() {
    const YellowAnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Yellow_Header_Maximum_Height - Yellow_Header_Minimum_Height
      ],

      outputRange: [Yellow_Header_Maximum_Height, Yellow_Header_Minimum_Height],

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
      <Animated.View
        style={[
          styles.headerBox,
          {
            height: YellowAnimateHeaderHeight,
            zIndex: 9999,
            backgroundColor: "#fead01",
            // height: 100,
            width: screenWidth,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderRadius: 35,
            paddingHorizontal: 30
          }
        ]}
      >
        <Text style={{ marginTop: 40, fontSize: 20, color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{this.state.username}</Text> is
          not your friend yet... Ask her to be one !
        </Text>
      </Animated.View>
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
  }
});
