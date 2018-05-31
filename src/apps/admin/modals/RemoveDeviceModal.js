import React from "react";
import PropTypes from "prop-types";

import "react-select/dist/react-select.css";

import { Modal, Button } from "../../../theme";

const RemoveDeviceModal = props => {
  const footer = (
    <React.Fragment>
      <Button onClick={props.onCancel}>Cancel</Button>
      <Button onClick={props.onConfirm} danger>
        Disconnect
      </Button>
    </React.Fragment>
  );
  return (
    <Modal title="Are you sure?" visible={props.isVisible} footer={footer} onCloseButtonClicked={props.onCancel}>
      {props.deviceName ? `Device "${props.deviceName}" will be disconnected. ` : "This device will be disconnected. "}
    </Modal>
  );
};

RemoveDeviceModal.propTypes = {
  isVisible: PropTypes.bool,
  deviceName: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default RemoveDeviceModal;
