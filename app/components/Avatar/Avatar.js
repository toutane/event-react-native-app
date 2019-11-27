import React from "react";
import { TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";
import firebase from "../../firebase/firebase";

export default class Avatar extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.user.uid === firebase.auth.currentUser.uid
            ? this.props.navigation.navigate("Profile")
            : this.props.navigation.navigate("ProfileView", {
                user_uid: this.props.user.uid
              })
        }
      >
        <Thumbnail
          source={{ uri: this.props.user.avatar }}
          style={{
            borderRadius: 13,
            width: this.props.width === undefined ? 45 : this.props.width,
            height: this.props.height === undefined ? 45 : this.props.height,
            marginLeft:
              this.props.marginLeft === undefined ? 8 : this.props.marginLeft
          }}
        />
      </TouchableOpacity>
    );
  }
}
