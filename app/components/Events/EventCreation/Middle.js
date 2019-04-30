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
import { Button } from "native-base";
import { Icon } from "expo";

export default class MiddleCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreView: false,
      badges: [],
      badge: []
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          this.setState({
            badge: []
          });
        }}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
            <TextInput
              style={styles.mainTitle}
              placeholder={"Title"}
              autoFocus={false}
              returnKeyType="next"
              selectionColor={"#797979"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "title")
              }
            />
            <TextInput
              multiline={true}
              style={[styles.subTitle, { lineHeight: 27 }]}
              placeholder={
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "
              }
              autoFocus={false}
              returnKeyType="go"
              selectionColor={"#797979"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "text")
              }
            />
            {/* <Text style={styles.subTitle}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
              ipsum repellendus esse doloremque natus corporis culpa quibusdam
              hic. Ad obcaecati deserunt exercitationem quasi et sed tempore
              rerum ducimus reiciendis maxime.
            </Text> */}
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      badge: [...this.state.badge, ""]
                    })
                  }
                >
                  <Icon.Feather
                    name="plus-circle"
                    size={28}
                    color="rgba(0, 0, 0, 0.2)"
                    style={{ marginRight: 7 }}
                  />
                </TouchableOpacity>
                {this.state.badge.map((wrd, index) => (
                  <TextInput
                    key={index}
                    style={{
                      borderRadius: 50,
                      marginRight: 7,
                      paddingHorizontal: 10,
                      height: 28,
                      backgroundColor: "#364EE1",
                      color: "white"
                    }}
                    value={wrd}
                    placeholderTextColor="white"
                    placeholder={wrd}
                    autoFocus={true}
                    returnKeyType="go"
                    selectionColor={"#797979"}
                    onChangeText={e =>
                      this.setState(
                        {
                          badge: this.state.badge
                            .filter((e, i) => i !== index)
                            .concat([e])
                        },
                        () => console.log(this.state.badge, index)
                      )
                    }
                    onSubmitEditing={() =>
                      this.setState(
                        {
                          badges: [
                            ...this.state.badges,
                            this.state.badge[index]
                          ],
                          badge: this.state.badge.filter((e, i) => i !== index)
                        },
                        () => console.log(this.state.badge, this.state.badges)
                      )
                    }
                  />
                  // <Button
                  //   key={i}
                  //   rounded
                  //   style={{
                  //     marginRight: 7,
                  //     paddingHorizontal: 10,
                  //     height: 28,
                  //     backgroundColor: "#364EE1"
                  //   }}
                  // >
                  //   <Text style={{ color: "white" }}>{wrd}</Text>
                  // </Button>
                ))}
                {this.state.badges.reverse().map((wrd, i) => (
                  <Button
                    key={i}
                    rounded
                    style={{
                      marginRight: 7,
                      paddingHorizontal: 10,
                      height: 28,
                      backgroundColor: "#364EE1"
                    }}
                  >
                    <Text style={{ color: "white" }}>{wrd}</Text>
                  </Button>
                ))}
              </View>
            </View>
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
