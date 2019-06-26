import React from "react";
import { Animated, Text } from "react-native";
import { Button } from "native-base";

export default class MessageBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View
        style={{ marginLeft: 15, top: 55, opacity: this.props.AnimateOpacity }}
      >
        <Button
          style={{
            height: 28,
            width: this.props.isFriend ? 95 : 200,
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: "#1DC161",
            justifyContent: "center"
          }}
          outline
          // onPress={() => this.props.SEND_FRIEND_REQUEST()}
        >
          <Text style={{ color: "white" }}>Message</Text>
        </Button>
      </Animated.View>
    );
  }
}
