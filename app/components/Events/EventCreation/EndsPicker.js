import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class Event_EndsPicker extends Component {
  render() {
    return (
      <DateTimePicker
        mode={!this.props.isFullDay ? "datetime" : "date"}
        date={this.props.starts.date}
        isVisible={this.props.isVisibleEnds}
        // isVisible={this.props.isVisibleDate}
        onConfirm={ends => this.props.handleEndsPicked(ends)}
        onCancel={this.props.hideEndsPicker}
      />
    );
  }
}
