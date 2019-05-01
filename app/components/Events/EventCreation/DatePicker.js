import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerTester extends Component {
  render() {
    return (
      <DateTimePicker
        date={this.props.date}
        isVisible={this.props.isVisible}
        onConfirm={date => this.props.handleDatePicked(date)}
        onCancel={this.props.hideDateTimePicker}
      />
    );
  }
}
