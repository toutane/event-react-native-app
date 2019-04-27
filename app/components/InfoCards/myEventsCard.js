import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { Card } from "../Card/styles";
import { Icon } from "expo";
export default class MyEventCard extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Card
          style={{
            backgroundColor: "white",
            paddingHorizontal: 0,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#747d8c",
            shadowOpacity: 0.15,
            shadowRadius: 15,
            shadowColor: "rgba(0, 0, 0, 1)",
            borderRadius: 17,
            alignItems: "center"
          }}
        >
          <View
            style={{ alignItems: "center", marginLeft: 25, marginRight: 25 }}
          >
            <Text
              style={{ textAlign: "center", color: "#57606f", fontSize: 14 }}
            >
              No event in progress ... You can still create one
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              rounded
              style={{
                marginTop: 15,
                paddingHorizontal: 10,
                height: 28,
                backgroundColor: "#364EE1"
              }}
            >
              <Text style={{ color: "white" }}>Create event</Text>
            </Button>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
