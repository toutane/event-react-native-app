import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";

export default class LocationMoreInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text
          style={{
            marginBottom: 10,
            fontWeight: "400",
            fontSize: 16,
            color: "rgba(0, 0, 0, 0.2)"
          }}
        >
          Additional information :
        </Text>
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Entry code
              </Text>
              <View
                style={{
                  flexDirection: "collumn",
                  left: 200,
                  position: "absolute"
                }}
              >
                <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={
                    this.props.isFavorite || this.props.isListed
                      ? this.props.location.entry_code
                      : ""
                  }
                  autoFocus={false}
                  returnKeyType="next"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "entry_code")
                  }
                />
                <View
                  style={{
                    top: 11,
                    height: 0.5,
                    width: 100,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Intercom
              </Text>
              <View
                style={{
                  flexDirection: "collumn",
                  left: 200,
                  position: "absolute"
                }}
              >
                <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={
                    this.props.isFavorite || this.props.isListed
                      ? this.props.location.intercom
                      : ""
                  }
                  autoFocus={false}
                  returnKeyType="next"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "intercom")
                  }
                />
                <View
                  style={{
                    top: 11,
                    height: 0.5,
                    width: 100,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black"
                }}
              >
                Floor
              </Text>
              <View
                style={{
                  flexDirection: "collumn",
                  left: 200,
                  position: "absolute"
                }}
              >
                <TextInput
                  multiline={false}
                  style={styles.subTitle}
                  placeholder={
                    this.props.isFavorite || this.props.isListed
                      ? this.props.location.floor
                      : ""
                  }
                  autoFocus={false}
                  returnKeyType="next"
                  selectionColor={"#1DC161"}
                  onChangeText={(e, stateName) =>
                    this.props.setInputsStates(e, "floor")
                  }
                />
                {/* <View
                  style={{
                    top: 11,
                    height: 0.5,
                    width: 100,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                  }}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: (screenWidth - 120) / 2,
    height: 70,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  subTitle: { fontSize: 16 }
});
