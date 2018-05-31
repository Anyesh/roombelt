import React from "react";

export default class extends React.Component {
  componentWillMount = () => document.body.classList.add("loaded");
  render = () => null;
}
