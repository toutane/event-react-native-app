import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import { Button } from "native-base";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";
import firebase from "../../firebase/firebase";
import UsersActions from "../../actions/usersActions";
import RequestInfoCard from "./RequestInfoCard";
import FriendsActions from "../../actions/friendsActions";

const moment = require("moment");

// const Header_Maximum_Height = 340;
const Header_Maximum_Height = 300;
const Header_Minimum_Height = 130;
const Yellow_Header_Maximum_Height = 100;
const Yellow_Header_Minimum_Height = 0;
const Header_Maximum_Text = 900;
const Header_Minimum_Text = 810;
const Header_Maximum_Text_Pos_Top = 75;
// const Header_Maximum_Text_Pos_Top = 115;
const Header_Minimum_Text_Pos_Top = -150;
// const Header_Maximum_Info_Pos = 225;
const Header_Maximum_Info_Pos = 185;
const Header_Minimum_Info_Pos = 65;
const Header_Maximum_Image_Pos = 150;
const Header_Minimum_Image_Pos = 50;
const Header_Maximum_Image_Height = 200;
// const Header_Maximum_Image_Height = 130;
// const Header_Minimum_Image_Height = 130;
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
      currentUser_avatar: "",
      currentUser_bio: "",
      username: "",
      nb_friends: 0,
      score: 0,
      register_date: undefined,
      usernameSize: 38
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    // console.log(this.props.navigation.getParam("user_uid"));
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
  async SEND_FRIEND_REQUEST(user_uid) {
    await UsersActions.GET_USER_AVATAR(firebase.auth.currentUser.uid).then(
      avatar =>
        this.setState({
          currentUser_avatar: avatar
        })
    );
    await UsersActions.GET_USER_BIO(firebase.auth.currentUser.uid).then(bio =>
      this.setState({
        currentUser_bio: bio
      })
    );
    FriendsActions.ADD_FRIEND_REQUEST(
      user_uid,
      this.state.currentUser_bio,
      this.state.currentUser_avatar
    );
  }
  reUpdateCurrentUserInfo(user_uid) {
    UsersActions.GET_USER_USERNAME(user_uid).then(username =>
      this.setState({
        username: username,
        // usernameSize: username.length <= 10 ? 50 : 38
        usernameSize: username.length <= 10 ? 38 : 38
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
    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: [Header_Maximum_Height, Header_Minimum_Height],

      extrapolate: "clamp"
    });
    const YellowAnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [
        0,
        Yellow_Header_Maximum_Height - Yellow_Header_Minimum_Height
      ],

      outputRange: [Yellow_Header_Maximum_Height, Yellow_Header_Minimum_Height],

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
        {/* <Animated.View
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
        </Animated.View> */}
        {/* <RequestInfoCard scrollAnimation={scrollAnimation} /> */}
        <Animated.View
          style={[
            styles.headerBox,
            { height: AnimateHeaderHeight, width: screenWidth }
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
                borderRadius: 12,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() =>
                // this.props.navigation.navigate("Home")
                this.props.navigation.pop()
              }
            >
              {/* <Icon.Feather name="arrow-up" size={25} color="white" /> */}
              <Icon.Ionicons
                style={{ top: 2 }}
                name="ios-arrow-round-up"
                size={35}
                color="white"
              />
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
                  borderRadius: 15,
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
                  // marginTop: 5,
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
                        ? this.state.bio.length <= 13
                          ? 25
                          : 25
                        : 25
                      : 17,
                  marginTop: 5,
                  marginLeft: 15,
                  fontWeight: "600",
                  color: "rgba(255,255,255,1)",
                  width: 220,
                  opacity: AnimateOpacity
                  // bottom: 8
                }}
              >
                {this.state.bio.length > 75
                  ? this.state.bio.slice(0, 75) + "..."
                  : this.state.bio}
                {/* {this.state.bio} */}
              </Animated.Text>
            )}
            {/* <Animated.Text
              style={{
                position: "absolute",
                top: 45,
                fontSize: 13,
                marginTop: 5,
                marginLeft: 15,
                fontWeight: "500",
                color: theme.colors.grey,
                width: 200,
                opacity: AnimateOpacity
              }}
            >
              {this.state.register_date === undefined
                ? "Registered 2 months ago"
                : "Registered " + moment(this.state.register_date).fromNow()}
            </Animated.Text> */}
          </View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 10,
            top: AnimatedInfoPosition,
            left: 160,
            position: "absolute"
          }}
        >
          <Animated.Text
            style={{
              fontSize: 12,
              marginLeft: 15,
              color: "white",
              width: 200,
              opacity: AnimateOpacity
            }}
          >
            {/* follow by{" "}
            <Text style={{ fontWeight: "bold", fontSize: 13 }}>Alex Kokai</Text> */}
          </Animated.Text>
          <Animated.View
            style={{
              flexDirection: "row",
              position: "absolute",
              marginTop: 20
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginLeft: 15,
                alignItems: "center"
              }}
              onPress={() =>
                this.props.navigation.navigate("FriendsList", {
                  user_uid: this.props.navigation.getParam("user_uid")
                })
              }
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
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
                    fontSize: 12,
                    color: theme.colors.grey,
                    opacity: AnimateOpacity,
                    fontWeight: "500"
                  }}
                >
                  Friend{this.state.nb_friends > 1 ? "s" : null}
                </Animated.Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
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
                  borderRadius: 10,
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
                    fontSize: 12,
                    fontWeight: "500",
                    color: theme.colors.grey,
                    opacity: AnimateOpacity
                  }}
                >
                  Score
                </Animated.Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{ marginLeft: 15, top: 55, opacity: AnimateOpacity }}
          >
            <Button
              style={{
                height: 28,
                width: 200,
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: "#1DC161",
                justifyContent: "center"
              }}
              outline
              onPress={() =>
                this.SEND_FRIEND_REQUEST(
                  this.props.navigation.getParam("user_uid")
                )
              }
            >
              <Text style={{ color: "white" }}>Friends Request</Text>
            </Button>
          </Animated.View>
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
        {/* <Animated.View
          style={{
            position: "absolute",
            top: 315,
            left: 175,
            opacity: AnimateOpacity
          }}
        >
          <Button
            // rounded
            style={{
              marginRight: 7,
              height: 28,
              paddingHorizontal: 10,
              backgroundColor: "#1DC161",
              alignItems: "center",
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: 13, color: "white" }}>
              Friends Request
            </Text>
          </Button>
        </Animated.View> */}
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
