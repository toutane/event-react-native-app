import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import ProfileView from "../profile/ProfileView";
import { Icon } from "expo";
// import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../../firebase/firebase";
import { Button, Text } from "native-base";

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 50;
const Header_Minimum_Text = 30;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = -50;
const Header_Maximum_Image_Pos = 150;
const Header_Minimum_Image_Pos = 50;
const Header_Maximum_Image_Height = 200;
const Header_Minimum_Image_Height = 100;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -10;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { avatar: "" };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    firebase
      .getCurrentUserAvatar()
      .then(avatar => this.setState({ avatar: avatar }));
    firebase.getCurrentUserBio().then(bio => this.setState({ bio: bio }));
  }
  render() {
    async function logout(props) {
      await firebase.logout();
      props.navigation.navigate("SignIn");
    }
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
    const AnimatedTextPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Text_Pos - Header_Minimum_Text_Pos],

      outputRange: [Header_Maximum_Text_Pos, Header_Minimum_Text_Pos],

      extrapolate: "clamp"
    });
    const AnimateOpacity = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Header_Maximum_Text_Opacity - Header_Minimum_Text_Opacity
      ],

      outputRange: [Header_Maximum_Text_Opacity, Header_Minimum_Text_Opacity],

      extrapolate: "clamp"
    });
    const AnimatedImagePosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Image_Pos - Header_Minimum_Image_Pos],

      outputRange: [Header_Maximum_Image_Pos, Header_Minimum_Image_Pos],

      extrapolate: "clamp"
    });
    const AnimatedImageHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Header_Maximum_Image_Height - Header_Minimum_Image_Height
      ],

      outputRange: [Header_Maximum_Image_Height, Header_Minimum_Image_Height],

      extrapolate: "clamp"
    });
    const AnimatedButtonsPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Buttons_Pos - Header_Minimum_Buttons_Pos],

      outputRange: [Header_Maximum_Buttons_Pos, Header_Minimum_Buttons_Pos],

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
          {/* <NotificationsList
            scrollAnimation={scrollAnimation}
            eventsFilter={this.state.eventsFilter}
            setNewSlideIndex={this.setNewSlideIndex}
            {...this.props}
          /> */}
          {/* <ProfileView scrollAnimation={scrollAnimation} /> */}
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
            opacity: AnimateOpacity,
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
            Profile
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
              <Icon.Feather
                name="log-out"
                size={30}
                color="white"
                onPress={() => logout(this.props)}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{ top: AnimatedImagePosition, position: "absolute" }}
        >
          {this.state.avatar !== "" ? (
            <Animated.Image
              source={{ uri: this.state.avatar }}
              style={{
                marginLeft: 30,
                borderRadius: 13,
                height: AnimatedImageHeight,
                width: 150
              }}
            />
          ) : null}
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
  }
});
