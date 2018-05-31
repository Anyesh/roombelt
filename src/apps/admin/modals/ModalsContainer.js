import React from "react";
import { connect } from "react-redux";

import EditDeviceModal from "./EditDeviceModal";
import RemoveDeviceModal from "./RemoveDeviceModal";

const name = (device, calendars) => {
  return device ? calendars[device.calendarId] && calendars[device.calendarId].summary : null;
};

const Modals = props => (
  <React.Fragment>
    <EditDeviceModal
      isVisible={!!props.editedDevice.data}
      isSaving={props.editedDevice.isSaving}
      device={props.editedDevice.data}
      calendars={props.calendars}
      onCancel={props.onCancelEditDevice}
      onSubmit={props.onSubmitEditDevice}
      onChangeCalendar={props.onChangeDeviceCalendar}
    />

    <RemoveDeviceModal
      isVisible={!!props.removedDevice}
      onCancel={props.onCancelRemoveDevice}
      onConfirm={props.onConfirmRemoveDevice}
      deviceName={name(props.removedDevice, props.calendars)}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  calendars: state.calendars,
  editedDevice: state.editedDevice,
  removedDevice: state.removedDevice
});

const mapDispatchToProps = dispatch => ({
  onSubmitEditDevice: () => dispatch({ type: ":edit-device--submit" }),
  onCancelEditDevice: () => dispatch({ type: ":edit-device--cancel" }),
  onChangeDeviceCalendar: calendarId => dispatch({ type: ":edit-device--set-calendar", calendarId }),

  onConfirmRemoveDevice: () => dispatch({ type: ":remove-device--confirm" }),
  onCancelRemoveDevice: () => dispatch({ type: ":remove-device--cancel" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
