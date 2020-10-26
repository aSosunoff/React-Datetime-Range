import React from "react";
import { mount } from "enzyme";

import Control from "./Control";

describe("Control", () => {
  let component, prevHandler, nextHandler;

  const getByDataId = (dataId) => component.find(`[data-test-id="${dataId}"]`);

  const getControlLeft = () => getByDataId("control-left");
  const runHandlerLeftControl = () => getControlLeft().simulate("click");

  const getControlRight = () => getByDataId("control-right");
  const runHandlerRightControl = () => getControlRight().simulate("click");

  beforeEach(() => {
    prevHandler = jest.fn();
    nextHandler = jest.fn();
    component = mount(
      <Control prevHandler={prevHandler} nextHandler={nextHandler} />
    );
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should render left control", () => {
    expect(getControlLeft()).toHaveLength(1);
  });

  it("should render right control", () => {
    expect(getControlRight()).toHaveLength(1);
  });

  it("should run handler to left control", () => {
    runHandlerLeftControl();
    expect(prevHandler).toHaveBeenCalled();
  });

  it("should run handler to right control", () => {
    runHandlerRightControl();
    expect(nextHandler).toHaveBeenCalled();
  });
});
