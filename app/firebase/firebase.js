import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyAehZaXp5l3uo_8WLYFzKTJh8X2OmIeMhA",
  authDomain: "event-reactnative-app.firebaseapp.com",
  databaseURL: "https://event-reactnative-app.firebaseio.com",
  projectId: "event-reactnative-app",
  storageBucket: "event-reactnative-app.appspot.com",
  messagingSenderId: "379112933900"
};

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

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addBio(bio) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set({
        bio: bio
      });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}
export default new Firebase();
