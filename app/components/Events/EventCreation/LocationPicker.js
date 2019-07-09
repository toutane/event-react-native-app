import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "expo";
import { screenWidth } from "../../../utils/dimensions";
import firebase from "../../../firebase/firebase";
import UsersActions from "../../../actions/usersActions";

// const homePlace = {
//   description: "Home",
//   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
// };
// const workPlace = {
//   description: "Work",
//   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
// };
export default class LocationPicker extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      favorite_locations: []
    };
  }
  componentDidMount() {
    this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .onSnapshot(() =>
        UsersActions.GET_USER_FAVORITE_LOCATIONS(
          firebase.auth.currentUser.uid
        ).then(locations =>
          this.setState({ favorite_locations: locations }, () =>
            console.log(this.state.favorite_locations)
          )
        )
      );
  }
  render() {
    return (
      // <View
      //   style={{
      //     backgroundColor: "#F7F7F7"
      //   }}
      // >
      //   <View
      //     style={{
      //       marginTop: 55,
      //       marginBottom: 15,
      //       flexDirection: "row",
      //       justifyContent: "center"
      //     }}
      //   >
      //     <Text style={{ fontWeight: "500", fontSize: 16 }}>Location</Text>
      //     <Button
      //       style={{
      //         position: "absolute",
      //         left: screenWidth - 50,
      //         top: -7,
      //         height: 35,
      //         width: 35,
      //         borderRadius: 10,
      //         backgroundColor: "rgba(0, 0, 0, 0.04)",
      //         justifyContent: "center"
      //       }}
      //       onPress={() => this.props.navigation.navigate("EventCreationView")}
      //     >
      //       <Icon.Ionicons name="ios-arrow-round-up" size={25} color="black" />
      //     </Button>
      //   </View>
      <View>
        <View
          style={{
            paddingVertical: 15,
            backgroundColor: "#F7F7F7"
          }}
        >
          <View
            style={{
              marginTop: 40,
              marginBottom: 23,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Location</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* <TextInput
              style={{
                width: screenWidth - 75,
                height: 36,
                marginRight: 15,
                marginLeft: 60,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderRadius: 10,
                paddingHorizontal: 10,
                fontSize: 18
              }}
              selectionColor={"#1DC161"}
              autoCapitalize="none"
              placeholder={"search"}
              autoFocus={false}
              returnKeyType="next"
              value={this.state.search}
              onChangeText={e => this.setState({ search: e })}
            /> */}
            <GooglePlacesAutocomplete
              placeholder="search location"
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              // keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails={true}
              // selectionColor={"#1DC161"}
              renderDescription={row =>
                row.description || row.formatted_address || row.name
              }
              // renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                this.props.navigation.getParam("setUpLocation")(data);
                this.props.navigation.navigate("EventCreationView");
                // 'details' is provided when fetchDetails = true
                // console.log(data);
              }}
              getDefaultValue={() => ""}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: "AIzaSyCjg_ds0yIsaxR4C2bvS0PksRey8QqqIoY",
                language: "en", // languagea of the results
                type: "geocode"
                // type: "(locality)"
                // type: "(administrative_area_level_1)"
                // types: "geocode" // default: 'geocode'
              }}
              // selectionColor={"#1DC161"}
              styles={{
                textInputContainer: {
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: "#F7F7F7",
                  paddingHorizontal: 10
                },
                textInput: {
                  bottom: 8,
                  width: screenWidth - 75,
                  height: 36,
                  // marginRight: 15,
                  marginLeft: 50,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  // selectionColor: "#1DC161"
                  fontSize: 18
                  // height: 36,
                  // marginRight: 5,
                  // marginLeft: 5,
                  // backgroundColor: "rgba(0, 0, 0, 0.04)",
                  // borderRadius: 10,
                  // paddingHorizontal: 10,
                  // fontSize: 18
                },
                description: {
                  fontWeight: "bold"
                  // fontSize: 18
                },
                predefinedPlacesDescription: {
                  color: "#1DC161"
                },
                listView: {
                  position: "absolute",
                  zIndex: 9999,
                  top: 60,
                  height: 800
                },
                row: {
                  backgroundColor: "white"
                },
                separator: { marginLeft: 20, marginRight: 20 }
              }}
              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              // nearbyPlacesAPI='None'
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: "distance",
                type: "airport"
              }}
              // GooglePlacesDetailsQuery={{
              //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              //   fields: "formatted_address"
              // }}
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3"
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              // filterReverseGeocodingByTypes={
              //   [
              //     // types: "geocode"
              //     // "geocode",
              //     // "administrative_area_level_3"
              //   ]
              // } // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              // predefinedPlaces={[homePlace, workPlace]}
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={() => (
              //   <Image source={require("path/custom/left-icon")} />
              // )}
            />
            <Button
              style={{
                position: "absolute",
                right: screenWidth - 50,
                height: 35,
                width: 35,
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                justifyContent: "center"
              }}
              onPress={() => this.props.navigation.pop()}
            >
              <Icon.Ionicons
                name="ios-arrow-round-back"
                size={30}
                style={{ bottom: 3 }}
                color="black"
              />
            </Button>
          </View>
        </View>
        {this.state.favorite_locations.length !== 0 ? (
          <View style={{ flexDirection: "row" }}>
            <Icon.MaterialCommunityIcons
              name="heart"
              size={30}
              style={{ bottom: 3 }}
              color="red"
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Favorite locations
              </Text>
              <Text
                style={{ fontWeight: "400", fontSize: 15, color: "#EBEDF0" }}
              >
                {this.state.favorite_locations.length}
                {this.state.favorite_locations.length > 0
                  ? " place"
                  : " places"}
              </Text>
            </View>
          </View>
        ) : null}
        {/* <GooglePlacesAutocomplete
          placeholder="Search location"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          // keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row =>
            row.description || row.formatted_address || row.name
          }
          // renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            this.props.navigation.getParam("setUpLocation")(data);
            this.props.navigation.navigate("EventCreationView");
            // 'details' is provided when fetchDetails = true
            // console.log(data);
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
              height: 36,
              marginRight: 5,
              marginLeft: 5,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderRadius: 10,
              paddingHorizontal: 10,
              fontSize: 18
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
          // predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          // renderLeftButton={() => (
          //   <Image source={require("path/custom/left-icon")} />
          // )}
        />*/}
      </View>
    );
  }
}
