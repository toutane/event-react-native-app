import firebase from "../firebase/firebase";

class EventsActions {
  // FOLLOWS REQUESTS NOTIFICATIONS

  async LOAD_UNIQUE_EVENT(event_id) {
    const event = await firebase.db
      .collection("events")
      .doc(event_id)
      .get();
    return { ...event.data(), id: event_id };
    // return event.data();
  }

  async EVENT_CREATED_NOTIFICATION(organizer, users, event_id) {
    users.forEach(user => {
      firebase.db
        .collection("users")
        .doc(user.uid)
        .collection("notifications")
        .add({
          type: "event_created",
          event: { uid: event_id },
          user: {
            uid: organizer.uid,
            username: organizer.username,
            avatar: organizer.avatar
          }
        });
    });
  }
}

export default new EventsActions();
