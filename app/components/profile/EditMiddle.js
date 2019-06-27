import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { screenWidth } from "../../utils/dimensions";

export default class EditMiddle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View
            style={{
              height: 0.5,
              width: screenWidth,
              backgroundColor: "rgba(0, 0, 0, 0.2)"
              // "black"
              // borderColor: "rgba(0, 0, 0, 0.1)"
              // borderWidth: 0.6
            }}
          />
          <View
            style={{ marginTop: 20, paddingHorizontal: 25, marginBottom: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                marginLeft: 5,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Name
              </Text>
              <View
                style={{
                  flexDirection: "collumn",
                  left: 145,
                  position: "absolute"
                }}
              >
                <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={this.props.name}
                  autoFocus={false}
                  returnKeyType="go"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "name")
                  }
                />
                <View
                  style={{
                    top: 8,
                    height: 0.5,
                    width: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                    // "black"
                    // borderColor: "rgba(0, 0, 0, 0.1)"
                    // borderWidth: 0.6
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                marginLeft: 5,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Username
              </Text>
              <View
                style={{
                  flexDirection: "collumn",
                  left: 145,
                  position: "absolute"
                }}
              >
                <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={this.props.username}
                  autoFocus={false}
                  returnKeyType="go"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "username")
                  }
                />
                <View
                  style={{
                    top: 8,
                    height: 0.5,
                    width: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                    // "black"
                    // borderColor: "rgba(0, 0, 0, 0.1)"
                    // borderWidth: 0.6
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                marginLeft: 5,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Bio
              </Text>
              <TextInput
                multiline={false}
                style={[styles.subTitle, { left: 145, position: "absolute" }]}
                placeholder={this.props.bio}
                autoFocus={false}
                returnKeyType="go"
                selectionColor={"#1DC161"}
                onChangeText={(e, stateName) =>
                  this.props.setInputsStates(e, "bio")
                }
              />
            </View>
          </View>
          {/* <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              height: 0.5,
              width: screenWidth,
              backgroundColor: "rgba(0, 0, 0, 0.2)"
              // "black"
              // borderColor: "rgba(0, 0, 0, 0.1)"
              // borderWidth: 0.6
            }}
          /> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 30,
    fontSize: 45,
    fontWeight: "bold",
    color: "black"
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 27,
    color: "black",
    fontFamily: "Arial"
  }
});
