import React from "react";
import { View, Text } from "react-native";
import { Thumbnail, Button } from "native-base";
import { Card } from "../../Card/styles";
import { Icon } from "expo";
import { Hr } from "../../Hr/styles";
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
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
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
      title: "Paola 20' birthday",
      time: "20:30",
      date: "1/05",
      location: "10 Downing Street",
      text:
        "He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show. Meet lain on he only size."
    }
  },
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
          "https://us.123rf.com/450wm/golubovy/golubovy1903/golubovy190300377/119098073-young-woman-portrait-fake-female-smile-eyes-closed-black-and-white-headshot-.jpg?ver=6"
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
      title: "Paola 20' birthday",
      time: "20:30",
      date: "1/05",
      location: "10 Downing Street",
      text:
        "He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show. Meet lain on he only size."
    }
  }
];

export default class EventsList extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {eventsList.map((event, i) => (
          <Card key={i} style={{ marginBottom: 20, paddingHorizontal: 0 }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
              <Thumbnail
                source={{ uri: event.organizer.avatar }}
                style={{ borderRadius: 13, width: 50, height: 50 }}
              />
              {event.participants.length > 0 ? (
                <View
                  style={{
                    borderRadius: 13,
                    backgroundColor: "#F9F0DB",
                    marginLeft: 10,
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#fead01",
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    +{event.participants.length}
                  </Text>
                </View>
              ) : null}
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  # {event.event.title}
                </Text>
                <Text
                  style={{ marginLeft: 15, fontSize: 16, color: "#797979" }}
                >
                  {event.event.type}
                </Text>
              </View>
            </View>
            <View
              style={{ marginTop: 20, marginBottom: 20, paddingHorizontal: 25 }}
            >
              <Text>{event.event.text}</Text>
            </View>
            <Hr style={{ marginLeft: 0, marginRight: 0 }} />
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                paddingHorizontal: 25,
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon.Feather
                  name="clock"
                  size={25}
                  color="rgba(0, 0, 0, 0.2)"
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    Time
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    {event.event.time}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon.Feather
                  name="calendar"
                  size={25}
                  color="rgba(0, 0, 0, 0.2)"
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    Date
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    {event.event.date}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon.Feather
                  name="map-pin"
                  size={25}
                  color="rgba(0, 0, 0, 0.2)"
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      color: "#797979",
                      fontWeight: "500"
                    }}
                  >
                    Location
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "black",
                      fontWeight: "600"
                    }}
                  >
                    {event.event.location.length > 5
                      ? event.event.location.slice(0, 4) + "..."
                      : event.event.location}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>
    );
  }
}
