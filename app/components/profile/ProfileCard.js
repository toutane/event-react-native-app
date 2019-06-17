import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";
import { Card } from "../Card/styles";

export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ paddingHorizontal: 30 }}>
        {/* <TouchableOpacity> */}
        {/* <Card
          style={{
            marginBottom: 20,
            marginLeft: 50,
            marginRight: 50
          }}
        >
          <View
            style={{
              flexDirection: "collumn",
              alignItems: "center"
            }}
          > */}
        <Thumbnail
          source={{ uri: this.props.avatar }}
          style={{ borderRadius: 13, width: 100, height: 200 }}
        />
        {/* </View> */}
        {/* // </Card> */}
        {/* </TouchableOpacity> */}
      </View>
    );
  }
}
