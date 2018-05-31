import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  user-select: none;
`;

const Dropdown = styled.ul`
  display: ${props => (props.visible ? "block" : "none")};
  z-index: 1;
  position: absolute;
  right: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-width: 12rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 14px;
  color: #6e7687;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
`;

export const DropdownMenuItem = styled.li`
  padding: 0.25rem 1.5rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
  }
`;

export class DropdownMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.triggerRef = React.createRef();
  }

  state = { isVisible: false };

  render = () => (
    <Wrapper>
      <span ref={this.triggerRef} onClick={this.toggle}>
        {this.props.trigger}
      </span>
      <Dropdown visible={this.state.isVisible}>{this.props.children}</Dropdown>
    </Wrapper>
  );

  toggle = () => {
    this.state.isVisible ? this.hide() : this.show();
  };

  show = () => {
    document.body.addEventListener("click", this.hideOnClick);
    this.setState({ isVisible: true });
  };

  hide = () => {
    document.body.removeEventListener("click", this.hideOnClick);
    this.setState({ isVisible: false });
  };

  hideOnClick = event => {
    if (!this.triggerRef.current.contains(event.target)) {
      this.hide();
    }
  };

  componentWillUnmount() {
    this.hide();
  }
}
