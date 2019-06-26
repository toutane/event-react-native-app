import React from "react";
import { theme } from "../../themes";
import { View, TouchableOpacity, Animated } from "react-native";
import { Icon } from "expo";

export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nb_friends: 0,
      score: 0
    };
  }
  render() {
    return (
      <View
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
              user_uid: this.props.user_uid
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
                top: this.props.AnimatedButtonsPosition
              }}
            >
              {this.props.nb_friends}
            </Animated.Text>
            <Animated.Text
              style={{
                fontSize: 12,
                color: theme.colors.grey,
                opacity: this.props.AnimateOpacity,
                fontWeight: "500"
              }}
            >
              Friend{this.props.nb_friends > 1 ? "s" : null}
            </Animated.Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: 25,
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
                top: this.props.AnimatedButtonsPosition
              }}
            >
              {this.props.score}
            </Animated.Text>
            <Animated.Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: theme.colors.grey,
                opacity: this.props.AnimateOpacity
              }}
            >
              Score
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
