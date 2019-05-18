import React from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";
import FollowRequestList from "../notifications/FollowRequestList";
import firebase from "../../firebase/firebase";
import FollowRequestHeader from "../notifications/FollowRequestHeader";

const Header_Maximum_Height = 150;
const Header_Minimum_Height = 100;
const FollowRequest_Maximum_Height = 170;
const FollowRequest_Minimum_Height = 102;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 50;

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { notifications: [], spinner: true };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .onSnapshot(() =>
        this.setState({ spinner: true }, () =>
          firebase
            .getCurrentUserNotifications()
            .then(notifications =>
              this.setState(
                { notifications: notifications },
                this.setState({ spinner: false })
              )
            )
        )
      );
  }
  render() {
    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: [Header_Maximum_Height, Header_Minimum_Height],

      extrapolate: "clamp"
    });
    const AnimateFollowRequestHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        FollowRequest_Maximum_Height - FollowRequest_Minimum_Height
      ],

      outputRange: [FollowRequest_Maximum_Height, FollowRequest_Minimum_Height],

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
            // paddingHorizontal: 30,
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35
          }}
        >
          <FollowRequestList
            scrollAnimation={scrollAnimation}
            notifications={this.state.notifications}
            spinner={this.state.spinner}
          />
        </Animated.View>
        <FollowRequestHeader
          notifications={this.state.notifications}
          AnimateFollowRequestHeight={AnimateFollowRequestHeight}
        />
        <Animated.View
          style={[
            styles.headerBox,
            {
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
            <Animated.Text style={styles.mainTitle}>Notification</Animated.Text>
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
