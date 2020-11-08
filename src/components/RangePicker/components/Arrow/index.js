import React from "react";
import ArrowDefault from "./ArrowDefault";

export const ArrowLeft = (props) => <ArrowDefault {...props} />;

export const ArrowBottom = (props) => (
  <ArrowDefault
    {...props}
    style={{
      ...props.style,
      transform: "rotate(270deg)",
    }}
  />
);

export const ArrowRight = (props) => (
  <ArrowDefault
    {...props}
    style={{
      ...props.style,
      transform: "rotate(180deg)",
    }}
  />
);

export const ArrowTop = (props) => (
  <ArrowDefault
    {...props}
    style={{
      ...props.style,
      transform: "rotate(90deg)",
    }}
  />
);
