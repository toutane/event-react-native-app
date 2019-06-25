import firebase from "../firebase/firebase";
import { Permissions, Notifications } from "expo";

class NotifsActions {
  // FOLLOWS REQUESTS NOTIFICATIONS
  async REGISTER_FOR_PUSH_NOTIFICATIONS() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .update({ expoPushToken: token });
  }
  async DELETE_NOTIFICATION(user_uid, notif_uid) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .collection("notifications")
      .doc(notif_uid)
      .delete();
  }
  async FOLLOW_REQUEST_ACCEPTED(
    newFriend_uid,
    newFriend_avatar,
    newFriend_username,
    newFriend_expoPushToken
  ) {
    firebase.db
      .collection("users")
      .doc(newFriend_uid)
      .collection("notifications")
      .add({
        type: "follow_request_accepted",
        user: {
          uid: firebase.auth.currentUser.uid,
          username: firebase.auth.currentUser.displayName,
          avatar: newFriend_avatar
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
            to: newFriend_expoPushToken,
            sound: "default",
            title: "Hey ! 👋 " + newFriend_username,
            body:
              firebase.auth.currentUser.displayName +
              " has just accept your friend request !",
            // priority: "normal"
            badge: 1
          })
        });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  async BECOME_NEW_FRIEND(newFriend) {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("notifications")
      .add({
        type: "new_friend",
        user: {
          username: newFriend.user.username,
          avatar: newFriend.user.avatar,
          uid: newFriend.user.uid
        }
      });
  }
}

export default new NotifsActions();
