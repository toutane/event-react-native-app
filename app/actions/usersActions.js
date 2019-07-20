import firebase from "../firebase/firebase";

class UsersActions {
  async GET_USER_USERNAME(userUid) {
    const username = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return username.get("username");
  }
  async GET_USER_NAME(userUid) {
    const name = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return name.get("name");
  }
  async GET_USER_EXPO_PUSH_TOKEN(userUid) {
    const token = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return token.get("expoPushToken");
  }
  async GET_USER_AVATAR(userUid) {
    const avatar = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return avatar.get("avatar");
  }
  async GET_USER_BIO(userUid) {
    const bio = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return bio.get("bio");
  }
  async GET_USER_SCORE(userUid) {
    const bio = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return bio.get("score");
  }
  async GET_USER_REGISTER_DATE(userUid) {
    const date = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return date.get("register_date");
  }
  async GET_USER_NB_FRIENDS(userUid) {
    const number = await firebase.db
      .collection("users")
      .doc(userUid)
      .get();
    return number.get("nb_friends");
  }
  async GET_USER_LISTED_LOCATIONS(userUid) {
    const locations = await firebase.db
      .collection("users")
      .doc(userUid)
      .collection("listed_locations")
      .get();
    return locations.docs.map(doc => ({
      ...doc.data(),
      ...{ uid: doc.id }
    }));
  }
  async GET_USER_NOTIFICATIONS(userUid) {
    const notifications = await firebase.db
      .collection("users")
      .doc(userUid)
      .collection("notifications")
      .get();
    return notifications.docs.map(doc => ({
      ...doc.data(),
      ...{ uid: doc.id }
    }));
  }
  async GET_USER_FRIENDS(userUid) {
    const friends = await firebase.db
      .collection("users")
      .doc(userUid)
      .collection("friends")
      .get();
    return friends.docs.map(doc => ({
      ...doc.data()
    }));
  }
  async GET_ALL_USERS() {
    const usersList = await firebase.db
      .collection("users")
      // .whereLessThan("uid", this.auth.currentUser.uid)
      .get();
    return usersList.docs
      .map(doc => ({ ...doc.data(), ...{ uid: doc.id } }))
      .filter(doc =>
        doc.uid === firebase.auth.currentUser.uid ? false : true
      );
  }
  async ADD_TO_LISTED_LOCATIONS(location) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("listed_locations")
      .add(location);
  }
  async ADD_TO_FAVORITE_LOCATIONS(location) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("listed_locations")
      .add(location);
  }
  async REMOVE_TO_FAVORITE_LOCATIONS(doc_uid) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("listed_locations")
      .doc(doc_uid)
      .delete();
  }
}

export default new UsersActions();
