import React from "react";
import { View, Text } from "react-native";
import { Thumbnail } from "native-base";
import { Card } from "../../Card/styles";

const eventsList = [
  {
    organizer: {
      username: "Alex Kokai",
      avatar: "https://www.abc.net.au/news/image/8094494-3x2-700x467.jpg"
    },
    event: {
      type: "party",
      title: "Friday party",
      text:
        "Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in. Society or if excited forbade. Here name off yet she long sold easy whom. Differed oh cheerful procured pleasure securing suitable in. Hold rich on an he oh fine. Chapter ability shyness article welcome be do on service. "
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
      text:
        "He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show. Meet lain on he only size. Branched learning so subjects mistress do appetite jennings be in. Esteems up lasting no village morning do offices. Settled wishing ability musical may another set age. Diminution my apartments he attachment is entreaties announcing estimating. And total least her two whose great has which. Neat pain form eat sent sex good week. Led instrument sentiments she simplicity.       "
    }
  }
];

export default class EventsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {eventsList.map((event, i) => (
          <Card key={i} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Thumbnail
                source={{ uri: event.organizer.avatar }}
                style={{ borderRadius: 13, width: 45, height: 45 }}
              />
              {event.participants.length > 0 ? (
                <View
                  style={{
                    borderRadius: 13,
                    backgroundColor: "#F9F0DB",
                    marginLeft: 10,
                    width: 45,
                    height: 45,
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
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  # {event.event.title}
                </Text>
                <Text
                  style={{ marginLeft: 15, fontSize: 14, color: "#797979" }}
                >
                  {event.event.type}
                </Text>
              </View>
            </View>
            <View>
              <Text>{event.event.text}</Text>
            </View>
          </Card>
        ))}
      </View>
    );
  }
}
