import React from "react";
import { mount } from "enzyme";

import RangePicker from "../RangePicker";

jest.mock("../../hooks/useShowDate");

describe("Control", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Control = () => wrapper.find("Control");
  const LeftButton = () => getByDataId(Control(), "control-left");
  const RightButton = () => getByDataId(Control(), "control-right");

  beforeEach(() => {
    require("../../hooks/useShowDate").default.mockImplementation(
      jest.requireActual("../../hooks/useShowDate").default
    );

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

    require("../../hooks/useShowDate").default.mockImplementation(
      (startDate) => ({
        ...jest.requireActual("../../hooks/useShowDate").default(startDate),
        prevMonthHandler,
      })
    );

    wrapper = mount(<RangePicker />);

    LeftButton().simulate("click");

    expect(prevMonthHandler).toHaveBeenCalled();
  });

  it("should call handler after click right button", () => {
    const nextMonthHandler = jest.fn();

    require("../../hooks/useShowDate").default.mockImplementation(
      (startDate) => ({
        ...jest.requireActual("../../hooks/useShowDate").default(startDate),
        nextMonthHandler,
      })
    );

    wrapper = mount(<RangePicker startDate={new Date()} />);

    RightButton().simulate("click");

    expect(nextMonthHandler).toHaveBeenCalled();
  });
});
