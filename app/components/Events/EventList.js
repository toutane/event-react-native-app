import React from "react";
import { View } from "react-native";
import EventCard from "./EventCard";
const eventsList = [
  {
    organizer: {
      username: "Alex Kokai",
      avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg"
    },
    event: {
      type: "party",
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
        state: "waiting"
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
        state: "unavailable"
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
        state: "waiting"
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
        state: "waiting"
      }
    ],
    event: {
      type: "restaurant",
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
      type: "party",
      title: "Thursday party",
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
          "https://img.freepik.com/photos-gratuite/seduisante-jeune-femme-aux-cheveux-boucles-prend-selfie-posant-regardant-camera_8353-6636.jpg?size=626&ext=jpg"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
      },
      {
        username: "Paola Jump",
        avatar:
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
      }
    ]
  },
  {
    organizer: {
      username: "Paola Jump",
      avatar:
        "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
    },
    participants: [],
    event: {
      type: "birthday",
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
  }
  render() {
    return (
      <View style={{ flex: 1, marginBottom: 100 }}>
        {this.props.eventsFilter === "all events"
          ? eventsList.map((event, i) => (
              <EventCard key={i} currentEvent={event} {...this.props} />
            ))
          : eventsList
              .filter(event => event.organizer.username === "Alex Kokai")
              .map((event, i) => (
                <EventCard key={i} currentEvent={event} {...this.props} />
              ))}
      </View>
    );
  }
}
