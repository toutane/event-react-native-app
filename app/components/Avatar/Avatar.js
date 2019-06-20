import React from "react";
import { TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";

export default class Avatar extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ProfileView", {
            user_uid: this.props.user.uid
          })
        }
      >
        <Thumbnail
          source={{ uri: this.props.user.avatar }}
          style={{
            borderRadius: 13,
            width: 45,
            height: 45,
            marginLeft: 8
          }}
        />
      </TouchableOpacity>
    );
  }
}
