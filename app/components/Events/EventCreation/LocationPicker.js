import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "expo";
import { screenWidth } from "../../../utils/dimensions";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

export default class LocationPicker extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: "#F7F7F7"
        }}
      >
        <View
          style={{
            marginTop: 55,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Location</Text>
          <Button
            style={{
              position: "absolute",
              left: screenWidth - 50,
              top: -7,
              height: 35,
              width: 35,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              justifyContent: "center"
            }}
            onPress={() => this.props.navigation.navigate("EventCreationView")}
          >
            <Icon.Ionicons name="ios-arrow-round-up" size={25} color="black" />
          </Button>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Search location"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          // keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCjg_ds0yIsaxR4C2bvS0PksRey8QqqIoY",
            language: "en", // languagea of the results
            types: "geocode" // default: 'geocode'
          }}
          // selectionColor={"#1DC161"}
          styles={{
            textInputContainer: {
              borderTopWidth: 0,
              backgroundColor: "#F7F7F7",
              paddingHorizontal: 10
            },
            textInput: {
              height: 34,
              borderRadius: 10,
              position: "absolute",
              width: "100%",
              top: -15
            },
            description: {
              fontWeight: "bold"
            },
            predefinedPlacesDescription: {
              color: "#1DC161"
            },
            listView: {
              position: "absolute",
              zIndex: 9999,
              top: 40
            },
            row: {
              backgroundColor: "white"
            },
            separator: { marginLeft: 20, marginRight: 20 }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            type: "cafe"
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: "formatted_address"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          // renderLeftButton={() => (
          //   <Image source={require("path/custom/left-icon")} />
          // )}
        />
      </View>
    );
  }
}
