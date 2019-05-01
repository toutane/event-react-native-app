import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class Event_DatePicker extends Component {
  render() {
    return (
      <DateTimePicker
        mode={"date"}
        date={this.props.date}
        isVisible={this.props.isVisibleDate}
        onConfirm={date => this.props.handleDatePicked(date)}
        onCancel={this.props.hideDatePicker}
      />
    );
  }
}
