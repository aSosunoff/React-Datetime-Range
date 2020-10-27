import React from "react";
import { ShowDateProvider } from "../contexts/showDateContext";

export const withShowDateContext = (WrapperComponent) => {
  const WithShowDateContext = (props) => {
    return (
      <ShowDateProvider startDate={props.startDate}>
        <WrapperComponent {...props} />
      </ShowDateProvider>
    );
  };

  return WithShowDateContext;
};
