import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import IoAndroidMoreVertical from "react-icons/lib/io/android-more-vertical";

import {
  Card,
  Text,
  StatusIcon,
  Table,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableHeader,
  TableBody,
  DropdownMenu,
  DropdownMenuItem,
  Loader
} from "../../../theme/index";

import EmptyState from './EmptyState'

const CalendarRowWrapper = styled(TableRow)`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const SingleDeviceRow = props => (
  <CalendarRowWrapper>
    <TableRowColumn onClick={props.onRowClicked} style={{ cursor: "pointer" }}>
      <Text block>{props.calendar ? props.calendar.summary : <em>No calendar connected</em>}</Text>
      <Text muted small>
        Added: {moment(props.device.createdTimestamp).format("MMM DD, YYYY ")}
      </Text>
    </TableRowColumn>
    <TableRowColumn onClick={props.onRowClicked} style={{ cursor: "pointer" }}>
      <Text block>
        <StatusIcon success={props.device.isOnline} danger={!props.device.isOnline} />
        {props.device.isOnline ? "Online" : "Offline"}
      </Text>
      <Text muted small>
        Seen {moment(Date.now() - props.device.msSinceLastActivity).fromNow()}
      </Text>
    </TableRowColumn>
    <TableRowColumn style={{ textAlign: "right" }}>
      <DropdownMenu trigger={<IoAndroidMoreVertical style={{ cursor: "pointer", color: "#555" }} />}>
        <DropdownMenuItem onClick={props.onConfigureClicked}>Configure</DropdownMenuItem>
        <DropdownMenuItem onClick={props.onDeleteClicked}>Disconnect</DropdownMenuItem>
      </DropdownMenu>
    </TableRowColumn>
  </CalendarRowWrapper>
);


const Devices = props => {
  if (!props.isLoaded) {
    return (
      <Card block style={{ textAlign: "center" }}>
        <Loader />
      </Card>
    );
  }

  if (props.isLoaded && props.devices.length === 0) {
    return <EmptyState />
  }

  const rows = props.devices.map(device => (
    <SingleDeviceRow
      key={device.id}
      onRowClicked={() => props.onConfigureDeviceClicked && props.onConfigureDeviceClicked(device)}
      onConfigureClicked={() => props.onConfigureDeviceClicked && props.onConfigureDeviceClicked(device)}
      onDeleteClicked={() => props.onDeleteDeviceClicked && props.onDeleteDeviceClicked(device)}
      device={device}
      calendar={props.calendars[device.calendarId]}
    />
  ));

  return (
    <Card block compact>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Calendar</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 50 }} />
          </TableRow>
        </TableHeader>
        <TableBody children={rows} />
      </Table>
    </Card>
  );
};

const mapStateToProps = state => ({
  isLoaded: state.devices.isLoaded,
  devices: state.devices.data,
  calendars: state.calendars
});

const mapDispatchToProps = dispatch => ({
  onConfigureDeviceClicked: device => dispatch({ type: ":start-edit-device", device }),
  onDeleteDeviceClicked: device => dispatch({ type: ":start-remove-device", device })
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
