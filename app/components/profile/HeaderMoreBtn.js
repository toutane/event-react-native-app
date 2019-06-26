import React, { Component } from "react";
import { View, Button, Text } from "native-base";
import { Icon } from "expo";
import ActionSheet from "react-native-actionsheet";
// import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

export default class HeaderMoreBtn extends Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <View>
        <Button
          style={{
            height: 35,
            width: 35,
            borderRadius: 10,
            backgroundColor: "rgba(255, 255, 255, 0)",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.showActionSheet}
        >
          <Icon.Feather
            name="more-horizontal"
            size={25}
            style={{ bottom: 1 }}
            color="white"
          />
        </Button>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={"Which one do you like ?"}
          options={["Report ", "Share this profile", "cancel"]}
          destructiveButtonIndex={0}
          cancelButtonIndex={2}
          onPress={index => {
            /* do something */
          }}
        />
      </View>
    );
  }
}
