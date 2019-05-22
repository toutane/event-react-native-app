import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Spinner } from "native-base";
import firebase from "../../firebase/firebase";
import Swiper from "react-native-swiper";
import MyEventCard from "../InfoCards/myEventsCard";
import FollowRequestCard from "./FollowRequest/FollowRequestCard";

const notifications = [
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Paloa Jump",
      uid: "c2t4oE1EhGZzFZlbC2SuwwDYcfl1",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
      bio: "it's me Paola"
    }
  },
  {
    type: "follow_request",
    user: {
      username: "Julie Pummet",
      uid: "bJmDKkKJKTQa3tWihDzp64eiqht1",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
      bio: "crazy girl"
    }
  }
];

export default class NotificationsList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      spinner: false
    };
  }
  componentDidMount() {
    // this.setState({ notifications: notifications });
    this.listenToChanges();
  }
  async listenToChanges() {
    firebase.db
      .collection("users")
      .doc(firebase.auth.currentUser.uid)
      .collection("notifications")
      .onSnapshot(() =>
        this.setState({ spinner: true }, () => this.loadNotifications())
      );
  }

  async loadNotifications() {
    firebase
      .getCurrentUserNotifications()
      .then(notifications =>
        this.setState(
          { notifications: notifications },
          this.setState({ spinner: false })
        )
      );
  }

  render() {
    return (
      <Swiper
        showsPagination={false}
        loop={false}
        index={this.props.eventsFilter}
        onIndexChanged={i => {
          this.props.setNewSlideIndex(i);
        }}
      >
        <ScrollView
          scrollEventThrottle={16}
          style={{ marginBottom: 100 }}
          onScroll={this.props.scrollAnimation}
        >
          <View style={{ marginTop: 100, marginBottom: 100 }}>
            {this.state.spinner ? (
              <Spinner />
            ) : (
              this.state.notifications
                .filter(notif => notif.type === "event_invitation")
                .map((notif, i) => (
                  // <EventCard
                  //   key={i}
                  //   currentEvent={event}
                  //   eventsFilter={this.props.eventsFilter}
                  //   {...this.props}
                  // />
                  <Text key={i}>{notif.user.username}</Text>
                ))
            )}
          </View>
        </ScrollView>
        <ScrollView
          scrollEventThrottle={16}
          style={{ marginBottom: 100 }}
          onScroll={this.props.scrollAnimation}
        >
          <View style={{ marginTop: 75, marginBottom: 100 }}>
            {this.state.spinner ? (
              <Spinner />
            ) : this.state.notifications.length === 0 ? null : ( // <MyEventCard />
              <View>
                <FollowRequestCard
                  style={{ marginBottom: 30 }}
                  notifications={this.state.notifications}
                  {...this.props}
                />
                {this.state.notifications
                  .filter(notif => notif.type === "follow_request")
                  .map((notif, i) => (
                    // <EventCard
                    //   key={i}
                    //   currentEvent={event}
                    //   eventsFilter={this.props.eventsFilter}
                    //   {...this.props}
                    // />
                    <Text key={i}>{notif.user.username}</Text>
                  ))}
              </View>
            )}
          </View>
        </ScrollView>
      </Swiper>
    );
  }
}
