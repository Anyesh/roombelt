import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "react-select/dist/react-select.css";

import { Modal, Button, LoaderButton } from "../../../theme";

class EditDeviceModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  render = () => {
    const footer = (
      <React.Fragment>
        <Button onClick={this.props.onCancel}>Cancel</Button>
        <LoaderButton primary onClick={this.props.onSubmit} isLoading={this.props.device && this.props.isSaving}>
          OK
        </LoaderButton>
      </React.Fragment>
    );

    return (
      <Modal
        title="Select connected calendar"
        visible={this.props.isVisible}
        footer={footer}
        onCloseButtonClicked={this.props.onCancel}
      >
        <Select
          instanceId="edit-device-choose-calendar"
          value={this.props.device && this.props.device.calendarId}
          options={Object.values(this.props.calendars).map(calendar => ({
            value: calendar.id,
            label: calendar.summary + (calendar.canModifyEvents ? '' : ' (read only)'),
            disabled: !calendar.canModifyEvents
          }))}
          onChange={event => this.props.onChangeCalendar && this.props.onChangeCalendar(event && event.value)}
          ref={this.select}
        />
      </Modal>
    );
  };

  componentDidUpdate(previousProps) {
    if (this.props.isVisible && !previousProps.isVisible) {
      this.select.current.focus();
    }
  }
}

EditDeviceModal.propTypes = {
  isVisible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onChangeCalendar: PropTypes.func,
  device: PropTypes.shape({ calendarId: PropTypes.string }),
  calendars: PropTypes.objectOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, summary: PropTypes.string.isRequired })
  )
};

export default EditDeviceModal;
