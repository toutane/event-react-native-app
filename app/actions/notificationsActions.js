import firebase from "../firebase/firebase";

class NotifsActions {
  // FOLLOWS REQUESTS NOTIFICATIONS

  async DELETE_NOTIFICATION(user_uid, notif_uid) {
    firebase.db
      .collection("users")
      .doc(user_uid)
      .collection("notifications")
      .doc(notif_uid)
      .delete();
  }
  async FOLLOW_REQUEST_ACCEPTED(newFriend_uid, newFriend_avatar) {
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

  // EVENTS_NOTIFICATIONS

  async EVENT_CREATED(organizer, users) {
    users.forEach(user => {
      firebase.db
        .collection("users")
        .doc(user.uid)
        .collection("notifications")
        .add({
          type: "event_created",
          user: {
            uid: organizer.uid,
            username: organizer.username,
            avatar: organizer.avatar
          }
        });
    });
  }
}

export default new NotifsActions();
