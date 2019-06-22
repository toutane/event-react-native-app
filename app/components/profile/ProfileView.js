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

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 130;
const Header_Maximum_Text = 900;
const Header_Minimum_Text = 810;
const Header_Maximum_Text_Pos_Top = 75;
const Header_Minimum_Text_Pos_Top = -150;
const Header_Maximum_Info_Pos = 80;
const Header_Minimum_Info_Pos = 25;
const Header_Maximum_Image_Pos = 150;
const Header_Minimum_Image_Pos = 50;
const Header_Maximum_Image_Height = 200;
const Header_Minimum_Image_Height = 100;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = 7;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;

export default class ProfileView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      skeleton: true,
      avatar: "",
      bio: "",
      username: "",
      nb_friends: 0,
      score: 0,
      usernameSize: 38
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.listenToChanges(this.props.navigation.getParam("user_uid"));
  }
  async listenToChanges(user_uid) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .onSnapshot(() =>
        this.setState({ skeleton: true }, () =>
          this.reUpdateCurrentUserInfo(user_uid)
        )
      );
  }
  reUpdateCurrentUserInfo(user_uid) {
    UsersActions.GET_USER_USERNAME(user_uid).then(username =>
      this.setState({
        username: username,
        usernameSize: username.length <= 10 ? 50 : 38
      })
    );
    UsersActions.GET_USER_AVATAR(user_uid).then(avatar =>
      this.setState({ avatar: avatar })
    );
    UsersActions.GET_USER_BIO(user_uid).then(bio =>
      this.setState({ bio: bio }, this.setState({ skeleton: false }))
    );
    UsersActions.GET_USER_NB_FRIENDS(user_uid).then(nb =>
      this.setState({ nb_friends: nb })
    );
    UsersActions.GET_USER_SCORE(user_uid).then(score =>
      this.setState({ score: score })
    );
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
    const AnimatedTextPositionTop = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Header_Maximum_Text_Pos_Top - Header_Minimum_Text_Pos_Top
      ],

      outputRange: [Header_Maximum_Text_Pos_Top, Header_Minimum_Text_Pos_Top],

      extrapolate: "clamp"
    });
    const AnimatedInfoPosition = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Info_Pos - Header_Minimum_Info_Pos],

      outputRange: [Header_Maximum_Info_Pos, Header_Minimum_Info_Pos],

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
      inputRange: [0, Header_Minimum_Buttons_Pos - Header_Maximum_Buttons_Pos],

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
        {/* {this.state.spinner ? (
          <Spinner />
        ) : ( */}
        <Animated.View
          style={{
            zIndex: 10,
            top: AnimatedTextPositionTop,
            position: "absolute",
            flexDirection: "row",
            justyContent: "space-between"
            // alignItems: "center"
          }}
        >
          <Animated.Text
            style={{
              fontSize: this.state.usernameSize,
              marginTop: 5,
              marginLeft: 30,
              fontWeight: "bold",
              color: "rgba(255,255,255,1)",
              width: 300
            }}
          >
            {this.state.username.length > 16
              ? this.state.username.slice(0, 13) + "..."
              : this.state.username}
          </Animated.Text>
          <Animated.View
            style={{
              opacity: AnimateOpacity,
              left: screenWidth - 70,
              position: "absolute"
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                marginTop: 7,
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() =>
                // this.props.navigation.navigate("Home")
                this.props.navigation.pop()
              }
            >
              <Icon.Feather name="arrow-up" size={25} color="white" />
            </TouchableOpacity>
          </Animated.View>
          {/* <Animated.View
            style={{
              top: AnimatedButtonsPosition,
              position: "absolute",
              opacity: AnimateOpacity
            }}
          >
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                // left: screenWidth - 80,
                // position: "absolute",
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() =>
                this.props.navigation.navigate("NotificationsView")
              }
            >
              <Icon.Feather
                name="settings"
                size={20}
                color="white"
                onPress={() => logout(this.props)}
              />
            </TouchableOpacity>
          </Animated.View> */}
        </Animated.View>
        <Animated.View
          style={{
            top: AnimatedImagePosition,
            position: "absolute",
            flexDirection: "row"
          }}
        >
          <View style={{ width: 160 }}>
            {this.state.avatar !== "" ? (
              <Animated.Image
                source={{ uri: this.state.avatar }}
                style={{
                  zIndex: 99,
                  marginLeft: 30,
                  borderRadius: 13,
                  height: AnimatedImageHeight,
                  width: 130
                }}
              />
            ) : null}
          </View>
          <View>
            {this.state.skeleton ? (
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 15,
                  width: 220,
                  // backgroundColor: "#eee",
                  height: 30
                }}
              />
            ) : (
              <Animated.Text
                style={{
                  fontSize:
                    this.state.bio.length <= 39
                      ? this.state.bio.length <= 23
                        ? 25
                        : 20
                      : 15,
                  marginTop: 5,
                  marginLeft: 15,
                  fontWeight: "bold",
                  color: "rgba(255,255,255,0.9)",
                  width: 220,
                  opacity: AnimateOpacity
                }}
              >
                {this.state.bio.length > 75
                  ? this.state.bio.slice(0, 75) + "..."
                  : this.state.bio}
              </Animated.Text>
            )}
            {/* <Animated.Text
              style={{
                fontSize: 16,
                marginTop: 5,
                marginLeft: 15,
                fontWeight: "500",
                color: theme.colors.grey,
                width: 200,
                opacity: AnimateOpacity
              }}
            >
              Registered 2 months ago
            </Animated.Text> */}
            <Animated.Text
              style={{
                position: "absolute",
                top: 65,
                fontSize: 14,
                marginTop: 5,
                marginLeft: 15,
                // fontWeight: "500",
                color: "white",
                width: 200,
                opacity: AnimateOpacity
              }}
            >
              follow by <Text style={{ fontWeight: "bold" }}>Alex Kokai</Text>
            </Animated.Text>
            <Animated.View
              style={{
                flexDirection: "row",
                marginTop: 10,
                position: "absolute",
                top: AnimatedInfoPosition
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 15,
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 8,
                    backgroundColor: "#A8AFE0",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon.Feather name="user" size={20} color="#364EE1" />
                </View>
                <View style={{ flexDirection: "collumn", marginLeft: 10 }}>
                  <Animated.Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                      top: AnimatedButtonsPosition
                    }}
                  >
                    {this.state.nb_friends}
                  </Animated.Text>
                  <Animated.Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.grey,
                      opacity: AnimateOpacity
                    }}
                  >
                    FRIEND{this.state.nb_friends > 1 ? "S" : null}
                  </Animated.Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 15,
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 8,
                    backgroundColor: "#F9F0DB",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon.Feather name="star" size={20} color="#fead01" />
                </View>
                <View style={{ flexDirection: "collumn", marginLeft: 10 }}>
                  <Animated.Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                      top: AnimatedButtonsPosition
                    }}
                  >
                    {this.state.score}
                  </Animated.Text>
                  <Animated.Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.grey,
                      opacity: AnimateOpacity
                    }}
                  >
                    SCORE
                  </Animated.Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.Text
          style={{
            position: "absolute",
            bottom: AnimateHeaderText,
            fontSize: 25,
            marginLeft: 175,
            fontWeight: "bold",
            color: "rgba(255,255,255,1)",
            width: 220
          }}
        >
          {this.state.username.length > 13
            ? this.state.username.slice(0, 10) + "..."
            : this.state.username}
        </Animated.Text>
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
