import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Input } from "native-base";
import { Icon } from "expo";

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
          <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
            <TextInput
              multiline={true}
              style={styles.subTitle}
              placeholder={this.props.name}
              autoFocus={false}
              returnKeyType="next"
              selectionColor={"#1DC161"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "title")
              }
            />
            <TextInput
              multiline={true}
              style={styles.subTitle}
              placeholder={this.props.username}
              autoFocus={false}
              returnKeyType="go"
              selectionColor={"#1DC161"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "text")
              }
            />
            <TextInput
              multiline={true}
              style={styles.subTitle}
              placeholder={this.props.bio}
              autoFocus={false}
              returnKeyType="go"
              selectionColor={"#1DC161"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "text")
              }
            />
          </View>
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
    marginTop: 30,
    fontSize: 18,
    lineHeight: 27,
    color: "black",
    fontFamily: "Arial"
  }
});
