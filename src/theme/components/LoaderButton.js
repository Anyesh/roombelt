import React from "react";
import Button from "./Button";
import Loader from "./Loader";

const size = "calc(var(--font-size) - 2px)";

export default ({ isLoading, disabled, children, ...props }) => (
  <Button {...props} disabled={disabled || isLoading}>
    {isLoading ? <Loader white={!props.white} style={{ height: size, width: size }} /> : children}
  </Button>
);
