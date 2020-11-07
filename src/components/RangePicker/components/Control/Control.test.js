import React from "react";
import { mount } from "enzyme";

import RangePicker from "../RangePicker";

jest.mock("../../contexts/showDateContext");

describe("Control", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Control = () => wrapper.find("Control");
  const LeftButton = () => getByDataId(Control(), "control-left");
  const RightButton = () => getByDataId(Control(), "control-right");

  const showDateContext = () => require("../../contexts/showDateContext");
  const requireActual = () =>
    jest.requireActual("../../contexts/showDateContext");

  beforeEach(() => {
    const context = showDateContext();
    const actual = requireActual();

    for (const key in context) {
      if (context[key].mockImplementation)
        context[key].mockImplementation(actual[key]);
    }

    wrapper = mount(<RangePicker />);
  });

  it("should render", () => {
    expect(Control()).toHaveLength(1);
  });

  it("should render left control", () => {
    expect(LeftButton()).toHaveLength(1);
  });

  it("should render right control", () => {
    expect(RightButton()).toHaveLength(1);
  });

  it("should call handler after click left button", () => {
    const prevMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      prevMonthHandler,
    }));

    wrapper = mount(<RangePicker />);

    LeftButton().simulate("click");

    expect(prevMonthHandler).toHaveBeenCalled();
  });

  it("should call handler after click right button", () => {
    const nextMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      nextMonthHandler,
    }));

    wrapper = mount(<RangePicker />);

    RightButton().simulate("click");

    expect(nextMonthHandler).toHaveBeenCalled();
  });
});
