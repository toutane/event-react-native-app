import firebase from "../firebase/firebase";
import usersActions from "./usersActions";
import UsersActions from "./usersActions";

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
  async ADD_FRIEND_REQUEST(
    user_uid,
    user_username,
    user_expoPushToken,
    currentUser_bio,
    currentUser_avatar
  ) {
    await firebase.db
      .collection("users")
      .doc(user_uid)
      .collection("notifications")
      .add({
        type: "follow_request",
        user: {
          uid: firebase.auth.currentUser.uid,
          expoPushToken: user_expoPushToken,
          username: firebase.auth.currentUser.displayName,
          bio: currentUser_bio,
          avatar: currentUser_avatar
        }
      })
      .then(() => {
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            to: user_expoPushToken,
            sound: "default",
            title: "Hey ! 👋 " + user_username,
            body:
              firebase.auth.currentUser.displayName +
              " wants to be your friend !",
            // priority: "normal"
            badge: 1,
            click_action: "fcm.ACTION.HELLO"
          })
        });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  async DELETE_FRIEND_TO_CURRENTUSER(docID) {
    await firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("friends")
      .doc(docID)
      .delete();
  }
  async DELETE_FRIEND_TO_USER(friend_uid) {
    await firebase.db
      .collection("users")
      .doc(friend_uid)
      .collection("friends")
      .where("uid", "==", firebase.auth.currentUser.uid)
      .delete();
  }
}

export default new FriendsActions();
