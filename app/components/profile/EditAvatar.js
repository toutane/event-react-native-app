// import React from "react";
// import { TouchableOpacity, View, Text } from "react-native";
// import { Thumbnail } from "native-base";
// import firebase from "../../firebase/firebase";

// export default class EditAvatar extends React.Component {
//   render() {
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: 30
//         }}
//       >
//         <TouchableOpacity
//         // onPress={() =>
//         //   this.props.user.uid === firebase.auth.currentUser.uid
//         //     ? this.props.navigation.navigate("Profile")
//         //     : this.props.navigation.navigate("ProfileView", {
//         //         user_uid: this.props.user.uid
//         //       })
//         //  }
//         >
//           <Thumbnail
//             source={{ uri: this.props.currentAvatar }}
//             style={{
//               borderRadius: 13,
//               width: 130,
//               height: 200
//             }}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             borderRadius: 13,
//             width: 210,
//             height: 200,
//             backgroundColor: "rgba(0,0,0,0.04)",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>
//             Change Photo
//           </Text>
//         </TouchableOpacity>
//       </View>

//     );
//   }
// }

import React from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";
import uuid from "uuid";
import firebase from "firebase";
import { Thumbnail } from "native-base";
import ActionSheet from "react-native-actionsheet";

console.disableYellowBox = true;
export default class App extends React.Component {
  state = {
    image: null,
    uploading: false
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 30
        }}
      >
        {this._maybeRenderImage()}
        <TouchableOpacity
          style={{
            borderRadius: 13,
            width: 210,
            height: 200,
            backgroundColor: "rgba(0,0,0,0.04)",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={this.showActionSheet}
        >
          {/* {this.state.uploading ? (
            <ActivityIndicator color="#fff" animating size="large" />
          ) : image ? null : (
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
                marginHorizontal: 15
              }}
            >
              Example: Upload ImagePicker result
            </Text>
          )}
          <Button
            onPress={this._pickImage}
            title="Pick an image from camera roll"
          />
          <Button onPress={this._takePhoto} title="Take a photo" />
          <StatusBar barStyle="default" /> */}
          <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>
            Change Photo
          </Text>
        </TouchableOpacity>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={"Which one do you like ?"}
          options={[
            "Remove Current Photo ",
            "Take Photo",
            "Choose From Library",
            "cancel"
          ]}
          destructiveButtonIndex={0}
          cancelButtonIndex={3}
          onPress={
            index =>
              index === 2
                ? this._pickImage()
                : index === 1
                ? this._takePhoto()
                : console.log(index)
            // this._pickImage
            // this.handlePress
            //   index => {
            //   index === "Choose From Library"
            //     ? this._pickImage
            //     : index === "Choose From Library"
            //     ? this._takePhoto
            //     : null;
            //   /* do something */
            // }
          }
        />
      </View>
    );
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return (
        <Thumbnail
          source={{
            uri: this.props.currentAvatar
          }}
          style={{
            borderRadius: 13,
            width: 130,
            height: 200
          }}
        />
      );
    }

    return (
      <View>
        {/* <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden"
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View> */}
        <Thumbnail
          source={{
            // uri: image === null ? this.props.currentAvatar : image
            uri: image
          }}
          style={{
            borderRadius: 13,
            width: 130,
            height: 200
          }}
        />
        {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text> */}
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    this.setState({ image: pickerResult.uri }, () =>
      this.props.setPickerResultState(pickerResult)
    );
    // this._handleImagePicked(pickerResult);
  };
}
