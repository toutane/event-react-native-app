import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { Button } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "expo";
import { screenWidth } from "../../../utils/dimensions";
import firebase from "../../../firebase/firebase";
import UsersActions from "../../../actions/usersActions";
const moment = require("moment");
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
      listed_locations: [],
      isFavoriteLocationsLoaded: true,
      isListedLocationsLoaded: true,
      isViewList: false
    };
  }
  componentDidMount() {
    this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("listed_locations")
      .onSnapshot(() =>
        UsersActions.GET_USER_LISTED_LOCATIONS(
          firebase.auth.currentUser.uid
        ).then(locations =>
          this.setState(
            { listed_locations: locations }
            // , () =>
            // console.log(this.state.listed_locations)
          )
        )
      );
  }
  isViewListFunction() {
    this.setState({ isViewList: true });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <GooglePlacesAutocomplete
                isViewListFunction={
                  // text =>
                  // text.length >= 1
                  //   ?
                  () => this.setState({ isViewList: true })
                  // : this.setState({ isViewList: false })
                }
                listed_locations={this.state.listed_locations}
                placeholder={
                  this.props.navigation.getParam("location").description
                }
                minLength={1} // minimum length of text to search
                autoFocus={true}
                returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                // keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed="auto" // true/false/undefined
                fetchDetails={true}
                // selectionColor={"#1DC161"}
                // renderDescription={row => {
                //   row.terms[0].value;
                // }}

                renderDescription={row => row.structured_formatting.main_text}
                // renderDescription={row =>
                //   row.description || row.formatted_address || row.name
                // }

                // renderDescription={row => row.description} // custom description render
                onPress={(
                  data,
                  add_info,
                  isFavorite,
                  isListed,
                  details = null
                ) => {
                  this.props.navigation.getParam("setUpLocation")(
                    data,
                    add_info
                  );
                  !isFavorite
                    ? !isListed
                      ? UsersActions.ADD_TO_LISTED_LOCATIONS({
                          ...data,
                          ...add_info,
                          saved_date: moment().format(),
                          isListed: true
                        })
                      : UsersActions.UPDATE_LISTED_LOCATION({
                          ...data,
                          ...add_info,
                          saved_date: moment().format()
                        })
                    : UsersActions.UPDATE_LISTED_LOCATION({
                        ...data,
                        ...add_info,
                        saved_date: moment().format()
                      });
                  this.props.navigation.navigate("EventCreationView");
                  // 'details' is provided when fetchDetails = true
                  // console.log(data);
                }}
                isFavoriteLocationsLoaded={this.state.isFavoriteLocationsLoaded}
                isListedLocationsLoaded={this.state.isListedLocationsLoaded}
                getDefaultValue={() =>
                  this.props.navigation.getParam("location").description !==
                  "search location"
                    ? this.props.navigation.getParam("location").description
                    : ""
                }
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: "AIzaSyCjg_ds0yIsaxR4C2bvS0PksRey8QqqIoY",
                  language: "en", // languagea of the results
                  type: "geocode"
                }}
                styles={{
                  textInputContainer: {
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    paddingHorizontal: 10
                  },
                  textInput: {
                    bottom: 8,
                    width: screenWidth - 75,
                    height: 36,
                    marginLeft: 50,
                    backgroundColor: "rgba(232, 233, 232, 1)",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 18
                  },
                  description: {
                    fontWeight: "bold",
                    fontSize: 16
                  },
                  predefinedPlacesDescription: {
                    color: "#1DC161"
                  },
                  listView: {
                    position: "absolute",
                    zIndex: 9999,
                    top:
                      this.state.listed_locations.filter(loc => loc.isFavorite)
                        .length !== 0
                        ? 132
                        : 60,
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
                // predefinedPlaces={this.state.listed_locations.filter(
                //   loc => !loc.isFavorite
                // )}
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
          {this.state.listed_locations.filter(loc => loc.isFavorite).length !==
          0 ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isFavoriteLocationsLoaded: !this.state
                    .isFavoriteLocationsLoaded,
                  isViewList: true
                })
              }
            >
              <View
                style={{
                  marginTop: 15,
                  marginLeft: 15,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Icon.MaterialCommunityIcons
                  style={{ top: 4 }}
                  name="heart-circle"
                  size={40}
                  color="#FE245D"
                />
                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Favorite locations
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 16,
                      color: "rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    {
                      this.state.listed_locations.filter(loc => loc.isFavorite)
                        .length
                    }
                    {this.state.listed_locations.filter(loc => loc.isFavorite)
                      .length > 1
                      ? " places"
                      : " place"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  top: 14,
                  height: 0.5,
                  backgroundColor: "rgba(0, 0, 0, 0.2)"
                }}
              />
            </TouchableOpacity>
          ) : null}
          {!this.state.isViewList ? (
            <View style={{ height: 1000, width: screenWidth }} />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
