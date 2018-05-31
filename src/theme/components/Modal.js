import React from "react";
import PropTypes from "prop-types";
import styled, { injectGlobal, css } from "styled-components";

import Card from "./Card";
import Button from "./Button";
import IoAndroidClose from "react-icons/lib/io/android-close";

const glassVisibleClass = "rui-modal-glass";

injectGlobal`
  :root[class*=${glassVisibleClass}] {
    max-height: 100%;
    overflow: hidden;
  }
`;

const glassVisibleStyles = css`
  transition: background 0.3s;
  background: rgba(0, 0, 0, 0.5);
  visibility: visible;

  & > * {
    transition: opacity 0.3s, transform 0.3s;
    opacity: 1;
    transform: none;
  }
`;

const glassInvisibleStyles = css`
  transition: background 0.3s, visibility 0s 0.3s;
  background: rgba(0, 0, 0, 0);
  visibility: hidden;

  & > * {
    transition: opacity 0.3s, transform 0.3s;
    opacity: 0;
    transform: translateY(-50px);
  }
`;

const Glass = styled.div`
  cursor: default;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;

  ${props => (props.visible ? glassVisibleStyles : glassInvisibleStyles)};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DefaultHeader = props => (
  <React.Fragment>
    <div>{props.title}</div>
    <IoAndroidClose
      onClick={() => props.onCloseButtonClicked && props.onCloseButtonClicked()}
      style={{ cursor: "pointer" }}
    />
  </React.Fragment>
);

const DefaultFooter = props => (
  <React.Fragment>
    <Button
      onClick={() => props.onSecondaryButtonClicked && props.onSecondaryButtonClicked()}
      children={props.secondaryButton}
    />
    <Button
      onClick={() => props.onPrimaryButtonClicked && props.onPrimaryButtonClicked()}
      primary
      disabled={props.isPrimaryButtonDisabled}
      children={props.primaryButton}
    />
  </React.Fragment>
);

class Modal extends React.Component {
  static modalId = 0;

  constructor(props) {
    super(props);
    this.documentElementClassName = `${glassVisibleClass}-${Modal.modalId++}`;
  }

  componentDidMount() {
    this.props.visible ? this.makeGlobalSideEffects() : this.revertGlobalSideEffects();
  }

  componentDidUpdate() {
    this.props.visible ? this.makeGlobalSideEffects() : this.revertGlobalSideEffects();
  }

  componentWillUnmount() {
    this.revertGlobalSideEffects();
  }

  makeGlobalSideEffects() {
    document.body.addEventListener("keyup", this.closeOnEscape);
    document.documentElement.classList.add(this.documentElementClassName);
  }

  revertGlobalSideEffects() {
    document.body.removeEventListener("keyup", this.closeOnEscape);
    document.documentElement.classList.remove(this.documentElementClassName);
  }

  closeOnEscape = event => {
    const formElements = ["INPUT", "TEXTAREA"];

    if (event.key === "Escape" && !formElements.includes(event.target.tagName)) {
      this.props.onCloseButtonClicked && this.props.onCloseButtonClicked();
    }
  };

  render() {
    const header = this.props.header !== null && (
      <HeaderWrapper children={this.props.header || <DefaultHeader {...this.props} />} />
    );

    const footer = this.props.footer !== null && (
      <FooterWrapper children={this.props.footer || <DefaultFooter {...this.props} />} />
    );

    return (
      <Glass visible={this.props.visible}>
        <Card
          block
          compact={this.props.compact}
          style={{ width: "80%", maxWidth: this.props.wide ? 800 : 600 }}
          header={header}
          footer={footer}
          children={this.props.children}
        />
      </Glass>
    );
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSecondaryButtonClicked: PropTypes.func,
  onPrimaryButtonClicked: PropTypes.func,
  onCloseButtonClicked: PropTypes.func,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
  isPrimaryButtonDisabled: PropTypes.bool,
  title: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  compact: PropTypes.bool,
  wide: PropTypes.bool
};

Modal.defaultProps = {
  primaryButton: "OK",
  secondaryButton: "Cancel"
};

export default Modal;
