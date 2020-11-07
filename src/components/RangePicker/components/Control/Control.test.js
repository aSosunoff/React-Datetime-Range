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
    const useShowDate = require("../../hooks/useShowDate");

    useShowDate.default.mockImplementation(() => ({
      showDate: new Date(),
      setShowDate: jest.fn(),
      setMonthHandler: jest.fn(),
      setYearHandler: jest.fn(),
      nextMonthHandler: jest.fn(),
      prevMonthHandler: jest.fn(),
    }));

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

    const useShowDate = require("../../hooks/useShowDate");

    useShowDate.default.mockImplementation(() => ({
      showDate: new Date(),
      setShowDate: jest.fn(),
      setMonthHandler: jest.fn(),
      setYearHandler: jest.fn(),
      nextMonthHandler: jest.fn(),
      prevMonthHandler,
    }));

    wrapper = mount(<RangePicker />);

    LeftButton().simulate("click");

    expect(prevMonthHandler).toHaveBeenCalled();
  });

  it("should call handler after click right button", () => {
    const nextMonthHandler = jest.fn();

    const useShowDate = require("../../hooks/useShowDate");

    useShowDate.default.mockImplementation(() => ({
      showDate: new Date(),
      setShowDate: jest.fn(),
      setMonthHandler: jest.fn(),
      setYearHandler: jest.fn(),
      nextMonthHandler,
      prevMonthHandler: jest.fn(),
    }));

    wrapper = mount(<RangePicker />);

    RightButton().simulate("click");

    expect(nextMonthHandler).toHaveBeenCalled();
  });
});
