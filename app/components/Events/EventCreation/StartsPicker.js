import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class Event_StartsPicker extends Component {
  render() {
    return (
      <DateTimePicker
        mode={!this.props.isFullDay ? "datetime" : "date"}
        date={this.props.starts.date}
        isVisible={this.props.isVisibleStarts}
        onConfirm={starts => this.props.handleStartsPicked(starts)}
        onCancel={this.props.hideStartsPicker}
      />
    );
  }
}
