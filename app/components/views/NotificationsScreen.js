import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button } from "native-base";
import { screenWidth } from "../../utils/dimensions";
import HeaderGradient from "../AnimatedHeader/styles";
import { Icon } from "expo";
import { theme } from "../../themes";
import FollowRequestList from "../notifications/FollowRequestList";
import firebase from "../../firebase/firebase";
import FollowRequestHeader from "../notifications/FollowRequestHeader";

const Header_Maximum_Height = 300;
const Header_Minimum_Height = 100;
const Header_Maximum_Text = 40;
const Header_Minimum_Text = 30;
const Header_Maximum_Text_Opacity = 1;
const Header_Minimum_Text_Opacity = 0;
const Header_Maximum_Text_Pos = 75;
const Header_Minimum_Text_Pos = 50;
const Header_Maximum_Buttons_Pos = 0;
const Header_Minimum_Buttons_Pos = -10;
const Header_Maximum_Event_Filter_Pos = 125;
const Header_Minimum_Event_Filter_Pos = -5;

const notifications = [
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  }
];

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      disabled: false,
      spinner: false,
      eventsFilter: 1
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.setState({ notifications: notifications });
    // this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .onSnapshot(() =>
        this.setState({ spinner: false }, () =>
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
          style={{ zIndex: 1, top: 100 }}
          scrollEventThrottle={16}
          onScroll={scrollAnimation}
        >
          {/* <FollowRequestList
            scrollAnimation={scrollAnimation}
            notifications={this.state.notifications}
            spinner={this.state.spinner}
          /> */}
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
            Notifications
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
              <Icon.Feather name="bell" size={30} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 10,
            flexDirection: "row",
            position: "absolute",
            top: EventFilterPosition,
            alignItems: "center",
            opacity: AnimateHeaderSubtitle
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ disabled: !this.state.disabled })}
          >
            <Icon.Feather
              name="moon"
              size={28}
              color={this.state.disabled ? "#364EE1" : "white"}
              style={{ marginTop: 2, marginBottom: 3, marginLeft: 30 }}
            />
          </TouchableOpacity>
          <Button
            rounded
            style={
              this.state.eventsFilter === 0
                ? [styles.activeEventBtn, { marginLeft: 13 }]
                : [styles.eventBtn, { marginLeft: 13 }]
            }
            onPress={() => this.setState({ eventsFilter: 0 })}
          >
            <Text
              style={
                this.state.eventsFilter === 0
                  ? { color: "#fead01", fontSize: 14 }
                  : { color: "#158E47", fontSize: 14 }
              }
            >
              following
            </Text>
          </Button>
          <Button
            rounded
            style={
              this.state.eventsFilter === 1
                ? [styles.activeEventBtn, { marginLeft: 13 }]
                : [styles.eventBtn, { marginLeft: 13 }]
            }
            onPress={() => this.setState({ eventsFilter: 1 })}
          >
            <Text
              style={
                this.state.eventsFilter === 1
                  ? { color: "#fead01", fontSize: 14 }
                  : { color: "#158E47", fontSize: 14 }
              }
            >
              {" "}
              you
            </Text>
          </Button>
        </Animated.View>
      </View>
      // <View style={{ flex: 1 }}>
      //   <Animated.View
      //     style={{
      //       zIndex: 1,
      //       top: AnimateHeaderHeight,
      //       width: screenWidth,
      //       position: "absolute",
      //       height: 900,
      //       backgroundColor: "#fff",
      //       shadowOpacity: 0.1,
      //       shadowRadius: 20,
      //       shadowColor: "rgba(0, 0, 0, 1)",
      //       // paddingHorizontal: 30,
      //       borderTopRightRadius: 35,
      //       borderTopLeftRadius: 35
      //     }}
      //   >
      //     <FollowRequestList
      //       scrollAnimation={scrollAnimation}
      //       notifications={this.state.notifications}
      //       spinner={this.state.spinner}
      //     />
      //   </Animated.View>
      //   <FollowRequestHeader
      //     notifications={this.state.notifications}
      //     AnimateFollowRequestHeight={AnimateFollowRequestHeight}
      //   />
      //   <Animated.View
      //     style={[
      //       styles.headerBox,
      //       {
      //         height: 300,
      //         width: screenWidth
      //       }
      //     ]}
      //   >
      //     <HeaderGradient
      //       width={screenWidth}
      //       headerFrom={"#158E47"}
      //       headerTo={"#1DC161"}
      //     />
      //   </Animated.View>
      //   <Animated.View
      //     style={{
      //       zIndex: 10,
      //       top: AnimatedTextPosition,
      //       position: "absolute"
      //     }}
      //   >
      //     <View
      //       style={{
      //         flexDirection: "row"
      //       }}
      //     >
      //       {/* <View style={{ zIndex: 10, flexDirection: "collum" }}> */}
      //       <Animated.Text style={styles.mainTitle}>
      //         Notifications
      //       </Animated.Text>
      //       <TouchableOpacity
      //         style={{
      //           height: 50,
      //           width: 50,
      //           left: screenWidth - 80,
      //           top: -10,
      //           position: "absolute",
      //           borderRadius: 13,
      //           backgroundColor: "rgba(255, 255, 255, 0.15)",
      //           justifyContent: "center",
      //           alignItems: "center"
      //         }}
      //         onPress={() => this.props.navigation.navigate("Home")}
      //       >
      //         <Icon.Feather name="bell" size={30} color="white" />
      //       </TouchableOpacity>
      //     </View>
      //   </Animated.View>
      //   <Animated.View
      //     style={{
      //       zIndex: 10,
      //       flexDirection: "row",
      //       position: "absolute",
      //       top: EventFilterPosition,
      //       alignItems: "center",
      //       opacity: AnimateHeaderSubtitle
      //     }}
      //   >
      //     <TouchableOpacity
      //       onPress={() => this.setState({ disabled: !this.state.disabled })}
      //     >
      //       <Icon.Feather
      //         name="moon"
      //         size={28}
      //         color={this.state.disabled ? "#364EE1" : "white"}
      //         style={{ marginTop: 2, marginBottom: 3, marginLeft: 30 }}
      //       />
      //     </TouchableOpacity>
      //     <Button
      //       rounded
      //       style={
      //         this.state.eventsFilter === 0
      //           ? [styles.activeEventBtn, { marginLeft: 13 }]
      //           : [styles.eventBtn, { marginLeft: 13 }]
      //       }
      //       onPress={() => this.setState({ eventsFilter: 0 })}
      //     >
      //       <Text
      //         style={
      //           this.state.eventsFilter === 0
      //             ? { color: "#fead01", fontSize: 14 }
      //             : { color: "#158E47", fontSize: 14 }
      //         }
      //       >
      //         following
      //       </Text>
      //     </Button>
      //     <Button
      //       rounded
      //       style={
      //         this.state.eventsFilter === 1
      //           ? [styles.activeEventBtn, { marginLeft: 13 }]
      //           : [styles.eventBtn, { marginLeft: 13 }]
      //       }
      //       onPress={() => this.setState({ eventsFilter: 1 })}
      //     >
      //       <Text
      //         style={
      //           this.state.eventsFilter === 1
      //             ? { color: "#fead01", fontSize: 14 }
      //             : { color: "#158E47", fontSize: 14 }
      //         }
      //       >
      //         you
      //       </Text>
      //     </Button>
      //   </Animated.View>
      // </View>
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
