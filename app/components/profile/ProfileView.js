import React from "react";
import { screenWidth } from "../../utils/dimensions";
import { StyleSheet, View, Animated, ScrollView } from "react-native";

import firebase from "../../firebase/firebase";
import UsersActions from "../../actions/usersActions";
import FriendsActions from "../../actions/friendsActions";

import HeaderGradient from "../AnimatedHeader/styles";
import ProfileHeaderBar from "./ProfileHeaderBar";
import ProfileInfo from "./ProfileInfo";
import FriendBtn from "./FriendBtn";
import MessageBtn from "./MessageBtn";

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 130;
const Header_Maximum_Text = 900;
const Header_Minimum_Text = 810;
const Header_Maximum_Text_Pos_Top = 95;
const Header_Minimum_Text_Pos_Top = -150;
const Header_Maximum_Info_Pos = 185;
const Header_Minimum_Info_Pos = 65;
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
      username: "",
      name: undefined,
      avatar: "",
      bio: "",
      currentUser_avatar: "",
      currentUser_bio: "",
      nb_friends: 0,
      score: 0,
      register_date: undefined,
      expoPushToken: undefined,
      usernameSize: 38,
      isFriend: false,
      friend_docID: "",
      currentUser_docID: ""
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.setState(
      { user_uid: this.props.navigation.getParam("user_uid") },
      () => this.listenToChanges(this.state.user_uid)
    );
  }
  listenToChanges(user_uid) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .onSnapshot(() =>
        this.setState({ skeleton: true }, () => this.reUpdateUserInfo(user_uid))
      );
    // firebase.db
    //   .collection("users")
    //   .doc(user_uid)
    //   .collection("friends")
    //   .onSnapshot(() =>
    //     UsersActions.GET_USER_FRIENDS(firebase.auth.currentUser.uid).then(
    //       friendsList =>
    //         friendsList.filter(friend => friend.uid === user_uid).length > 0
    //           ? this.setState(
    //               {
    //                 isFriend: true
    //               },
    //               () => console.log(this.state.username + " is your friend 😃")
    //             )
    //           : this.setState(
    //               {
    //                 isFriend: false
    //               },
    //               () => console.log(this.state.username + " is not your friend")
    //             )
    //     )
    //   );
  }
  async BREAK_FRIENDSHIP(user_uid) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("friends")
      .where("uid", "==", user_uid)
      .get()
      .then(doc => doc.forEach(doc => this.setState({ friend_docID: doc.id })))
      .then(() =>
        FriendsActions.DELETE_FRIEND_TO_CURRENTUSER(
          this.state.friend_docID
        ).then(
          this.setState({ isFriend: false }, () =>
            console.log(this.state.username + "is not longer your friend 😕")
          )
        )
      );
    firebase.db
      .collection("users")
      .doc(user_uid)
      .collection("friends")
      .where("uid", "==", firebase.auth.currentUser.uid)
      .get()
      .then(doc =>
        doc.forEach(doc => this.setState({ currentUser_docID: doc.id }))
      )
      .then(() =>
        FriendsActions.DELETE_FRIEND_TO_USER(
          user_uid,
          this.state.currentUser_docID
        ).then(() =>
          console.log(
            firebase.auth.currentUser.displayName +
              "is not longer your friend 😕"
          )
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
      this.state.username,
      this.state.expoPushToken,
      this.state.currentUser_bio,
      this.state.currentUser_avatar
    );
  }
  reUpdateUserInfo(user_uid) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .collection("friends")
      .onSnapshot(() =>
        UsersActions.GET_USER_FRIENDS(firebase.auth.currentUser.uid).then(
          friendsList =>
            friendsList.filter(friend => friend.uid === user_uid).length > 0
              ? this.setState(
                  {
                    isFriend: true
                  },
                  () => console.log(this.state.username + " is your friend 😃")
                )
              : this.setState(
                  {
                    isFriend: false
                  },
                  () => console.log(this.state.username + " is not your friend")
                )
        )
      );
    UsersActions.GET_USER_USERNAME(user_uid).then(username =>
      this.setState({
        username: username,
        // usernameSize: username.length <= 10 ? 50 : 38
        // usernameSize: username.length <= 10 ? 38 : 38
        usernameSize: username.length <= 10 ? 35 : 35
      })
    );
    UsersActions.GET_USER_NAME(user_uid).then(name =>
      this.setState({ name: name })
    );
    UsersActions.GET_USER_EXPO_PUSH_TOKEN(user_uid).then(token =>
      this.setState({
        expoPushToken:
          token === undefined
            ? "ExponentPushToken[XZ7vA8OXzlZ5Jipi0cT4sQ]"
            : token
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
            { height: AnimateHeaderHeight, width: screenWidth }
          ]}
        >
          <HeaderGradient
            width={screenWidth}
            headerFrom={"#158E47"}
            headerTo={"#1DC161"}
          />
        </Animated.View>
        <ProfileHeaderBar
          AnimateOpacity={AnimateOpacity}
          username={this.state.username}
          {...this.props}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 85,
            width: screenWidth,
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 0.6,
            opacity: AnimateOpacity
          }}
        />
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
          <View>
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
          </View>
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
                  marginLeft: 15,
                  width: 220,
                  height: 30
                }}
              />
            ) : (
              <Animated.Text
                style={{
                  fontSize: 17,
                  // this.state.bio.length <= 39
                  //   ? this.state.bio.length <= 23
                  //     ? this.state.bio.length <= 13
                  //       ? 25
                  //       : 25
                  //     : 25
                  //   : 17,
                  marginTop: 10,
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
          <ProfileInfo
            AnimateOpacity={AnimateOpacity}
            AnimatedButtonsPosition={AnimatedButtonsPosition}
            nb_friends={this.state.nb_friends}
            score={this.state.score}
            user_uid={this.state.user_uid}
            {...this.props}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <FriendBtn
              isFriend={this.state.isFriend}
              AnimateOpacity={AnimateOpacity}
              SEND_FRIEND_REQUEST={() =>
                // this.setState({ isFriend: !this.state.isFriend })
                this.SEND_FRIEND_REQUEST(this.state.user_uid)
              }
              BREAK_FRIENDSHIP={() =>
                this.BREAK_FRIENDSHIP(this.state.user_uid)
              }
            />
            {this.state.isFriend ? (
              <MessageBtn
                isFriend={this.state.isFriend}
                AnimateOpacity={AnimateOpacity}
              />
            ) : null}
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
  }
});
