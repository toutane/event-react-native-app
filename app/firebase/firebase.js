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

  async register(name, email, password, avatar, bio) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .set({
        bio: bio
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
  async getCurrentUserAvatar() {
    const avatar = await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get();
    return avatar.get("avatar");
  }
  async getAllUsers() {
    const usersList = await this.db
      .collection("users")
      // .whereLessThan("uid", this.auth.currentUser.uid)
      .get();
    return usersList.docs
      .map(doc => ({ ...doc.data(), ...{ uid: doc.id } }))
      .filter(doc => (doc.uid === this.auth.currentUser.uid ? false : true));
  }
}
export default new Firebase();
