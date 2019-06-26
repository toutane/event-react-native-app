import React from "react";
import { Animated, Text } from "react-native";
import { Button } from "native-base";
import ActionSheet from "react-native-actionsheet";
import { Icon } from "expo";

export default class FriendBtn extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

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
          onPress={
            !this.props.isFriend
              ? () => this.props.SEND_FRIEND_REQUEST()
              : this.showActionSheet
          }
        >
          <Text style={{ color: "white", marginRight: 3 }}>
            {this.props.isFriend ? "Friend" : "Friend Request"}
          </Text>
          <Icon.Feather
            name="chevron-down"
            size={15}
            // style={{ bottom: 1 }}
            color="white"
          />
        </Button>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={"Which one do you like ?"}
          options={["Notifications", "Break the bonds of friendship", "cancel"]}
          destructiveButtonIndex={1}
          cancelButtonIndex={2}
          onPress={index => {
            index === 1 ? this.props.BREAK_FRIENDSHIP() : null;
            /* do something */
          }}
        />
      </Animated.View>
    );
  }
}
