import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class Event_TimePicker extends Component {
  render() {
    return (
      <DateTimePicker
        mode={"time"}
        date={this.props.time}
        isVisible={this.props.isVisibleTime}
        onConfirm={time => this.props.handleTimePicked(time)}
        onCancel={this.props.hideTimePicker}
      />
    );
  }
}
