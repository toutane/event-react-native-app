import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share } from "react-native";
import { screenWidth } from "../../../utils/dimensions";
import { Icon } from "expo";
import LocationMoreInfo from "./LocationMoreInfo";
const moment = require("moment");

import UsersActions from "../../../actions/usersActions";

export default class LocationRowView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_code:
        this.props.isFavorite || this.props.isListed
          ? this.props.location.entry_code
          : "",
      intercom:
        this.props.isFavorite || this.props.isListed
          ? this.props.location.intercom
          : "",
      floor:
        this.props.isFavorite || this.props.isListed
          ? this.props.location.floor
          : ""
    };
  }

  setInputsStates(stateContent, stateName) {
    this.setState({ [stateName]: stateContent });
  }
  _share = () => {
    Share.share({
      // title: "Check out this address",
      message: `Check out this address : ${this.props.rowData.description}`
      // url: this.state.image
    });
  };
  render() {
    return (
      <View style={{ paddingHorizontal: 50, paddingVertical: 10 }}>
        <View
          style={{
            marginBottom: 20,
            height: 0.5,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        />
        <LocationMoreInfo
          {...this.props}
          setInputsStates={(stateContent, stateName) =>
            this.setInputsStates(stateContent, stateName)
          }
        />
        <View
          style={{
            marginBottom: 20,
            height: 0.5,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        />
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            style={[styles.box, { marginRight: 20 }]}
            onPress={
              !this.props.isFavorite
                ? !this.props.isListed
                  ? () =>
                      UsersActions.ADD_TO_FAVORITE_LOCATIONS({
                        isFavorite: true,
                        saved_date: moment().format(),
                        ...this.props.rowData,
                        ...{
                          entry_code: this.state.entry_code,
                          intercom: this.state.intercom,
                          floor: this.state.floor
                        }
                      })
                  : () =>
                      UsersActions.UPDATE_LISTED_LOCATION({
                        ...this.props.rowData,
                        ...{
                          entry_code: this.state.entry_code,
                          intercom: this.state.intercom,
                          floor: this.state.floor
                        },
                        isFavorite: true,
                        isListed: false,
                        saved_date: moment().format()
                      })
                : () =>
                    UsersActions.UPDATE_LISTED_LOCATION({
                      ...this.props.rowData,
                      ...{
                        entry_code: this.state.entry_code,
                        intercom: this.state.intercom,
                        floor: this.state.floor
                      },
                      isFavorite: false,
                      isListed: true,
                      saved_date: moment().format()
                    })
              // UsersActions.REMOVE_TO_FAVORITE_LOCATIONS(
              //   this.props.favorite_locations_UID
              // )
            }
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Icon.AntDesign
                style={{ marginBottom: 5 }}
                name="heart"
                size={20}
                color={this.props.isFavorite ? "#FE245D" : "rgba(0,0,0,0.2)"}
              />
              <Text
                style={{
                  color: this.props.isFavorite ? "#FE245D" : "rgba(0,0,0,0.2)"
                }}
              >
                {this.props.isFavorite ? "Favorite" : "Add to favorite"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={this._share}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Icon.Feather
                style={{ marginBottom: 8 }}
                name="share"
                size={22}
                color={"rgba(0,0,0,0.2)"}
              />
              <Text
                style={{
                  color: "rgba(0,0,0,0.2)"
                }}
              >
                Share
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            height: 0.5,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        />
        <TouchableOpacity
          style={{
            width: screenWidth - 100,
            height: 40,
            borderRadius: 13,
            backgroundColor: "#1DC161",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            marginBottom: 10
          }}
          onPress={() =>
            this.props._onPress(
              this.props.rowData,
              this.state,
              this.props.isFavorite,
              this.props.isListed
            )
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "400",
                fontSize: 16
              }}
            >
              Take this location
            </Text>
          </View>
        </TouchableOpacity>
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
  }
});
