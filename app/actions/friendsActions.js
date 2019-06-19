import firebase from "../firebase/firebase";

class FriendsActions {
  async INCREASE_NB_FRIENDS(user_uid, nb_friends) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .update({
        nb_friends: nb_friends + 1
      });
  }
  async ADD_FRIEND_TO_CURRENTUSER(newFriend) {
    await firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("friends")
      .add({
        uid: newFriend.user.uid,
        username: newFriend.user.username,
        bio: newFriend.user.bio,
        avatar: newFriend.user.avatar
      });
  }
  async ADD_FRIEND_TO_USER(newFriend_uid, currentUser_bio, currentUser_avatar) {
    await firebase.db
      .collection("users")
      .doc(newFriend_uid)
      .collection("friends")
      .add({
        uid: firebase.auth.currentUser.uid,
        username: firebase.auth.currentUser.displayName,
        bio: currentUser_bio,
        avatar: currentUser_avatar
      });
  }
}

export default new FriendsActions();
