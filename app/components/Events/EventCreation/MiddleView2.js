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
import { Hr } from "../../Hr/styles";
const moment = require("moment");
import Event_StartsPicker from "./StartsPicker";
import Event_EndsPicker from "./EndsPicker";
import { Input } from "native-base";
import { Feather } from "@expo/vector-icons";

export default class MiddleView2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreView: false,
      badge: []
    };
  }
  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView behavior="position" enabled>
            <View
              style={{ marginTop: 20, paddingHorizontal: 25, marginBottom: 40 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 25,
                  // marginLeft: 5,
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
                  Title
                </Text>
                <View
                  style={{
                    flexDirection: "collumn",
                    left: 145,
                    position: "absolute"
                  }}
                >
                  {/* <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={this.props.name}
                  autoFocus={false}
                  returnKeyType="go"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "name")
                  }
                /> */}
                  <TextInput
                    multiline={false}
                    style={styles.subTitle}
                    placeholder={`${this.props.username}'s event`}
                    autoFocus={true}
                    returnKeyType="next"
                    selectionColor={"#1DC161"}
                    onChangeText={(e, stateName) =>
                      this.props.setInputsStates(e, "title")
                    }
                  />
                  <View
                    style={{
                      top: 11,
                      height: 0.5,
                      width: 215,
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
                  // marginLeft: 5,
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
                  Description
                </Text>
                <View
                  style={{
                    flexDirection: "collumn",
                    left: 145,
                    position: "absolute"
                  }}
                >
                  {/* <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={this.props.name}
                  autoFocus={false}
                  returnKeyType="go"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "name")
                  }
                /> */}
                  <TextInput
                    multiline={false}
                    style={styles.subTitle}
                    placeholder={"Description of the event"}
                    autoFocus={false}
                    returnKeyType="next"
                    selectionColor={"#1DC161"}
                    onChangeText={(e, stateName) =>
                      this.props.setInputsStates(e, "text")
                    }
                  />
                  <View
                    style={{
                      top: 11,
                      height: 0.5,
                      width: 215,
                      backgroundColor: "rgba(0, 0, 0, 0.2)"
                      // "black"
                      // borderColor: "rgba(0, 0, 0, 0.1)"
                      // borderWidth: 0.6
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 25,
                  // marginLeft: 5,
                  alignItems: "center"
                }}
                onPress={() =>
                  this.props.navigation.navigate("LocationPicker", {
                    setUpLocation: data => this.props.setUpLocation(data)
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "black"
                  }}
                >
                  Location
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      left: 145,
                      position: "absolute",
                      color:
                        this.props.location.description !== ""
                          ? "black"
                          : "rgba(0,0,0,0.23)"
                    }
                  ]}
                >
                  {this.props.location.description !== ""
                    ? this.props.location.description.length > 25
                      ? this.props.location.description.slice(0, 25) + "..."
                      : this.props.location.description
                    : // ? this.props.location.description.split(",")[0]
                      // : this.props.location.description.split(",")[0]
                      "Current location"}
                </Text>
              </TouchableOpacity>
              {/* <TextInput
              multiline={true}
              style={styles.subTitle}
              placeholder={"Title"}
              autoFocus={false}
              returnKeyType="next"
              selectionColor={"#1DC161"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "title")
              }
            />
            <TextInput
              multiline={true}
              style={[styles.subTitle, { lineHeight: 27 }]}
              placeholder={"Description of the event"}
              autoFocus={false}
              returnKeyType="go"
              selectionColor={"#1DC161"}
              onChangeText={(e, stateName) =>
                this.props.setInputsStates(e, "text")
              }
            /> */}
              {/* <Text style={styles.subTitle}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
              ipsum repellendus esse doloremque natus corporis culpa quibusdam
              hic. Ad obcaecati deserunt exercitationem quasi et sed tempore
              rerum ducimus reiciendis maxime.
            </Text> */}
              {/* <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => this.props.addBadge()}>
                  <Feather
                    name="tag"
                    size={28}
                    color="rgba(0, 0, 0, 0.2)"
                    style={{ marginRight: 7 }}
                  />
                </TouchableOpacity>
                {this.props.badge.map((wrd, index) => (
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
                    onChangeText={e => this.props.addBadgeValue(e, index)}
                    onSubmitEditing={
                      /^\s*$/.test(wrd)
                        ? () => this.props.filterBadge()
                        : () => null
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
              </View>
            </View> */}
            </View>
            <Hr style={{ marginLeft: 0, marginRight: 0 }} />

            {/* <Hr style={{ marginLeft: 0, marginRight: 0 }} /> */}
            <Event_StartsPicker {...this.props} />
            <Event_EndsPicker {...this.props} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <View
          style={{ marginTop: 20, paddingHorizontal: 25, marginBottom: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              // marginLeft: 5,
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
              Full day
            </Text>
            <View
              style={{
                flexDirection: "collumn",
                left: 145,
                position: "absolute"
              }}
            >
              <Feather
                style={{ left: 175 }}
                name={!this.props.isFullDay ? "toggle-left" : "toggle-right"}
                size={40}
                color={!this.props.isFullDay ? "rgba(0, 0, 0, 0.2)" : "#1DC161"}
                onPress={this.props.handleFullDay}
              />
              <View
                style={{
                  top: 4.5,
                  height: 0.5,
                  width: 215,
                  backgroundColor: "rgba(0, 0, 0, 0.2)"
                  // "black"
                  // borderColor: "rgba(0, 0, 0, 0.1)"
                  // borderWidth: 0.6
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 25,
              // marginLeft: 5,
              alignItems: "center"
            }}
            onPress={this.props.showStartsPicker}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "black"
              }}
            >
              Starts
            </Text>
            <View
              style={{
                flexDirection: "collumn",
                left: 145,
                position: "absolute"
              }}
            >
              {this.props.isFullDay ? (
                <Text
                  style={[
                    styles.subTitle,
                    {
                      fontSize: 18,
                      color: "#1DC161",
                      fontWeight: "600"
                    }
                  ]}
                >
                  {moment(this.props.starts.date).format("dddd ll")}
                </Text>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 215
                  }}
                >
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        // left: 145,
                        fontSize: 18,
                        // position: "absolute",
                        color: "#1DC161",
                        fontWeight: "600"
                      }
                    ]}
                  >
                    {moment(this.props.starts.date).format("ll")}
                  </Text>
                  {!this.props.isFullDay ? (
                    <Text
                      style={[
                        styles.subTitle,
                        {
                          // position: "absolute",
                          color: "#1DC161",
                          fontWeight: "600"
                        }
                      ]}
                    >
                      {moment(this.props.starts.time).format("LT")}
                    </Text>
                  ) : null}
                </View>
              )}
              <View
                style={{
                  top: 11,
                  height: 0.5,
                  width: 215,
                  backgroundColor: "rgba(0, 0, 0, 0.2)"
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 25,
              alignItems: "center"
            }}
            onPress={this.props.showEndsPicker}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "black"
              }}
            >
              Ends
            </Text>
            {this.props.isFullDay ? (
              <Text
                style={[
                  styles.subTitle,
                  {
                    left: 145,
                    fontSize: 18,
                    position: "absolute",
                    color: "#1DC161",
                    fontWeight: "600"
                  }
                ]}
              >
                {moment(this.props.ends.date).isBefore(
                  moment(this.props.starts.date)
                )
                  ? moment(this.props.starts.date).format("dddd ll")
                  : moment(this.props.ends.date).format("dddd ll")}
              </Text>
            ) : (
              <View
                style={{
                  left: 145,
                  position: "absolute",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 215
                }}
              >
                <Text
                  style={[
                    styles.subTitle,
                    {
                      fontSize: 18,
                      color: "#1DC161",
                      fontWeight: "600"
                    }
                  ]}
                >
                  {moment(this.props.ends.date).isBefore(
                    moment(this.props.starts.date)
                  )
                    ? moment(this.props.starts.date).format("ll")
                    : moment(this.props.ends.date).format("ll")}
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      fontSize: 18,
                      color: "#1DC161",
                      fontWeight: "600"
                    }
                  ]}
                >
                  {moment(this.props.ends.time).isBefore(
                    moment(this.props.starts.time)
                  )
                    ? moment(this.props.starts.time).format("LT")
                    : moment(this.props.ends.time).format("LT")}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
