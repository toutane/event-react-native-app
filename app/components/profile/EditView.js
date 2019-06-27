import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Thumbnail, Badge } from "native-base";
import { screenWidth } from "../../utils/dimensions";
import { LinearGradient } from "expo";
import EditHeader from "./EditHeader";
import EditAvatar from "./EditAvatar";
import EditMiddle from "./EditMiddle";
import uuid from "uuid";
// import firebase from "../../firebase/firebase";
import firebase from "firebase";
// import * as firebase from "firebase";

export default class EditView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      canUpdate: false,
      name: "",
      username: "",
      bio: "",
      avatar: "",
      pickerResult: "",
      newAvatar: "",
      email: "",
      portable: ""
    };
  }
  async updateProfile() {
    await this.uploadImageAsync(this.state.pickerResult.uri).then(url =>
      this.setState({ newAvatar: url }, () =>
        firebase
          .firestore()
          .collection("users")
          .doc(this.props.navigation.getParam("user_uid"))
          .update({ avatar: this.state.newAvatar })
          .then(() => console.log(this.state.newAvatar))
      )
    );
    this.props.navigation.pop();
  }
  async uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  // _handleImagePicked = async pickerResult => {
  //   try {
  //     this.setState({ uploading: true });

  //     if (!pickerResult.cancelled) {
  //       uploadUrl = await this.props.uploadImageAsync(pickerResult.uri);
  //       this.setState({ image: uploadUrl });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     alert("Upload failed, sorry 🖕");
  //   } finally {
  //     this.setState({ uploading: false });
  //   }
  // };
  setPickerResultState(pickerResult) {
    this.setState({ pickerResult: pickerResult, canUpdate: true }, () =>
      console.log(pickerResult.uri)
    );
  }
  componentDidMount() {}
  render() {
    return (
      <View>
        <ScrollView style={{ zIndex: 1, height: 1800 }} scrollEventThrottle={1}>
          <View style={[styles.headerBox, { zIndex: 99 }]}>
            <View style={{ marginTop: 45 }}>
              <EditHeader
                {...this.props}
                canUpdate={this.state.canUpdate}
                updateProfile={() => this.updateProfile()}
              />
              <EditAvatar
                uploadImageAsync={uri => this.uploadImageAsync(uri)}
                setPickerResultState={result =>
                  this.setPickerResultState(result)
                }
                currentAvatar={this.props.navigation.getParam("avatar")}
              />
              {/* <EditMiddle
                setInputsStates={(stateContent, stateName) =>
                  this.setInputsStates(stateContent, stateName)
                }
                name={this.props.navigation.getParam("name")}
                username={this.props.navigation.getParam("username")}
                bio={this.props.navigation.getParam("bio")}
              /> */}
              {/* <Event_CreationInfo
                {...this.props}
                time={this.state.time}
                handleTimePicked={time => this.handleTimePicked(time)}
                isVisibleTime={this.state.isTimePickerVisible}
                showTimePicker={this.showTimePicker}
                hideTimePicker={this.hideTimePicker}
                date={this.state.date}
                handleDatePicked={date => this.handleDatePicked(date)}
                isVisibleDate={this.state.isDatePickerVisible}
                showDatePicker={this.showDatePicker}
                hideDatePicker={this.hideDatePicker}
                location={this.state.location}
                setUpLocation={location => this.setUpLocation(location)}
              /> */}
            </View>
          </View>
          <View style={{ zIndex: 20 }}>
            <View style={{ backgroundColor: "#158E47" }}>
              <View style={{ backgroundColor: "#158E47" }}>
                <View style={styles.middleBox} />
              </View>
            </View>
            {/* <MembersView
              {...this.props}
              addParticipants={selected_participants =>
                this.addParticipants(selected_participants)
              }
              invited_participants={this.state.invited_participants}
            /> */}
          </View>
          <View
            style={{
              zIndex: 0,
              backgroundColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,1)",
              shadowOpacity: 0.5,
              shadowRadius: 15,
              height: 300
            }}
          >
            <LinearGradient
              colors={["#158E47", "#1DC161"]}
              style={{
                height: 300,
                width: screenWidth,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: screenWidth,
    paddingVertical: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.15,
    shadowRadius: 15
  },
  middleBox: {
    width: screenWidth,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white"
  }
});
