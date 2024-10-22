import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import config from "../config/config";

const moment = require("moment");

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password, avatar, bio) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set({
        name: "",
        username: name,
        bio: bio,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/event-reactnative-app.appspot.com/o/2cb18760-c80f-4fd8-a68e-9eee2bc3fe6c?alt=media&token=371b6980-29a2-4417-9633-c4879af8fb2d",
        nb_friends: 0,
        score: 0,
        register_date: moment().format()
        // register_date: moment(new Date()).format("X")
      });
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }
  getCurrentUserId() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}
export default new Firebase();
