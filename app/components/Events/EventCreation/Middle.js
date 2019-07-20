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
import firebase from "../../../firebase/firebase";
import { Hr } from "../../Hr/styles";
const moment = require("moment");
import Event_StartsPicker from "./StartsPicker";
import Event_EndsPicker from "./EndsPicker";
import { Input } from "native-base";
import { Icon } from "expo";
import { screenWidth } from "../../../utils/dimensions";
import UsersActions from "../../../actions/usersActions";

export default class MiddleCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreView: false,
      add_info: { entry_code: "", intercom: "", floor: "" },
      badge: []
    };
  }
  setInputsStates(stateContent, stateName) {
    this.setState(
      {
        [stateName]: {
          entry_code:
            this.state.add_info.entry_code.length === 1 && stateContent === ""
              ? this.props.add_info.entry_code
              : stateContent,
          intercom: this.state.add_info.intercom,
          floor: this.state.add_info.floor
        }
      },
      () => console.log(this.state.add_info)
    );
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
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 25,
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
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 25,
                  alignItems: "center"
                }}
                onPress={() =>
                  this.props.navigation.navigate("LocationPicker", {
                    setUpLocation: (data, add_info) =>
                      this.setState(
                        { add_info: add_info },
                        this.props.setUpLocation(data, add_info)
                      ),
                    location: this.props.location
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
                        this.props.location.description !== "search location"
                          ? "black"
                          : "rgba(0,0,0,0.23)"
                    }
                  ]}
                >
                  {this.props.location.description !== "search location"
                    ? this.props.location.description.length > 20
                      ? this.props.location.description.slice(0, 22) + "..."
                      : this.props.location.description
                    : "Current location"}
                </Text>
              </TouchableOpacity>
              {this.state.add_info.entry_code !== "" ||
              this.state.add_info.intercom !== "" ||
              this.state.add_info.floor !== "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 25
                  }}
                >
                  {this.state.add_info.entry_code !== "" ? (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "black"
                        }}
                      >
                        Entry code{"  "}
                      </Text>
                      <TextInput
                        multiline={false}
                        style={{
                          fontWeight: "400",
                          fontSize: 16,
                          color: "rgba(0, 0, 0, 0.2)"
                        }}
                        placeholder={this.state.add_info.entry_code}
                        autoFocus={false}
                        returnKeyType="go"
                        selectionColor={"#1DC161"}
                        onChangeText={(e, stateName) =>
                          this.setInputsStates(e, "add_info")
                        }
                      />
                    </View>
                  ) : null}
                  {this.state.add_info.intercom !== "" ? (
                    <Text
                      style={{
                        position: "absolute",
                        left: 145,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "black"
                      }}
                    >
                      Intercom{"  "}
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 16,
                          color: "rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        {this.state.add_info.intercom}
                      </Text>
                    </Text>
                  ) : null}
                  {this.state.add_info.floor !== "" ? (
                    <Text
                      style={{
                        position: "absolute",
                        left: 300,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "black"
                      }}
                    >
                      Floor{"  "}
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 16,
                          color: "rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        {this.state.add_info.floor}
                      </Text>
                    </Text>
                  ) : null}
                </View>
              ) : null}
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
                  <Icon.Feather
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
              <Icon.Feather
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
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 25,
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
                        fontSize: 18,
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
