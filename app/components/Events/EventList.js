import React from "react";
import { View } from "react-native";
import EventCard from "./EventCard";
import firebase from "../../firebase/firebase";
import Swiper from "react-native-swiper";

const eventsList = [
  {
    organizer: {
      username: "Alex Kokai",
      avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg"
    },
    event: {
      badge: ["party🎉", "holidays🌴"],
      title: "Friday party",
      time: "12:00",
      date: "24/04",
      location: "25 Mary Street",
      text:
        "Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in."
    },
    participants: [
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "unavailable"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "waiting"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "unavailable"
      },
      {
        username: "Alex Kokai",
        avatar:
          "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2016/01/28/14540017202113.png",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "unavailable"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      }
    ]
  },
  {
    organizer: {
      username: "Julie Pummet",
      avatar:
        "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg"
    },
    participants: [
      {
        username: "Julie Pummet",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "waiting"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "waiting"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "unavailable"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "available"
      },
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "unavailable"
      }
    ],
    event: {
      badge: ["restaurant🍕"],
      title: "Saturday's restaurant",
      time: "20:30",
      date: "1/05",
      location: "10 Downing Street",
      text:
        "He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show !"
    }
  },
  {
    organizer: {
      username: "Jake Harter",
      avatar:
        "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2016/01/28/14540017202113.png"
    },
    event: {
      badge: ["party🎉"],
      title: "Thursday party",
      time: "12:00",
      date: "24/04",
      location: "25 Mary Street",
      text:
        "Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in."
    },
    participants: [
      {
        username: "Alex Kokai",
        avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg",
        state: "waiting"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "waiting"
      }
    ]
  },
  {
    organizer: {
      username: "Paola Jump",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
    },
    participants: [
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6",
        state: "available"
      }
    ],
    event: {
      badge: ["birthday🎂", "Paola👱🏼‍♀️"],
      title: "Paola 20' birthday with her bests friends !",
      time: "20:30",
      date: "1/05",
      location: "10 Downing Street",
      text:
        "He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show !"
    }
  }
];

export default class EventsList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eventsList: []
    };
  }
  componentDidMount() {
    this.listenToChanges();
  }

  async listenToChanges() {
    firebase.db.collection("events").onSnapshot(() => this.loadEvents());
  }

  async loadEvents() {
    const eventsList = await firebase.db.collection("events").get();
    return this.setState(
      {
        eventsList: eventsList.docs.map(doc => ({
          ...doc.data()
        }))
      },
      () =>
        this.props.setNbInvitations(
          this.state.eventsList
            .filter(
              event => event.organizer.uid !== firebase.auth.currentUser.uid
            )
            .filter(event =>
              event.participants.find(
                part =>
                  part.uid === firebase.auth.currentUser.uid &&
                  part.state === "waiting"
              )
            ).length
        ),
      () => console.log("updating event list")
    );
  }
  ref = el => {
    this.swiper = el;
  };
  render() {
    return (
      <Swiper
        showsPagination={false}
        showsButtons={false}
        loop={false}
        index={this.props.eventsFilter}
        onIndexChanged={i => this.props.setNewSlideIndex(i)}
      >
        <View style={{ flex: 1, marginBottom: 100 }}>
          {this.state.eventsList
            .filter(
              event =>
                event.organizer.uid === firebase.auth.currentUser.uid ||
                event.participants.find(
                  part =>
                    part.uid === firebase.auth.currentUser.uid &&
                    part.state === "available"
                )
            )
            .map((event, i) => (
              <EventCard
                key={i}
                currentEvent={event}
                eventsFilter={this.props.eventsFilter}
                {...this.props}
              />
            ))}
        </View>
        <View style={{ flex: 1, marginBottom: 100 }}>
          {this.state.eventsList
            .filter(
              event => event.organizer.uid === firebase.auth.currentUser.uid
            )
            .map((event, i) => (
              <EventCard
                key={i}
                currentEvent={event}
                eventsFilter={this.props.eventsFilter}
                {...this.props}
              />
            ))}
        </View>
        <View style={{ flex: 1, marginBottom: 100 }}>
          {this.state.eventsList
            .filter(
              event => event.organizer.uid !== firebase.auth.currentUser.uid
            )
            .filter(event =>
              event.participants.find(
                part =>
                  part.uid === firebase.auth.currentUser.uid &&
                  part.state === "waiting"
              )
            )
            .map((event, i) => (
              <EventCard
                key={i}
                currentEvent={event}
                eventsFilter={this.props.eventsFilter}
                {...this.props}
              />
            ))}
        </View>
      </Swiper>
    );
  }
}
