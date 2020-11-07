import React from "react";
import { mount } from "enzyme";

import RangePicker from "../RangePicker";

jest.mock("../../contexts/rangeContext");

describe("TimePicker", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const TimePicker = () => wrapper.find("TimePicker");
  const StartInput = () => getByDataId(TimePicker(), "time-picker-start");
  const EndInput = () => getByDataId(TimePicker(), "time-picker-end");

  const rangeContext = () => require("../../contexts/rangeContext");
  const requireActual = () => jest.requireActual("../../contexts/rangeContext");

  beforeEach(() => {
    const context = rangeContext();
    const actual = requireActual();

    for (const key in context) {
      if (context[key].mockImplementation)
        context[key].mockImplementation(actual[key]);
    }

    wrapper = mount(<RangePicker />);
  });

  it("should render", () => {
    expect(TimePicker()).toHaveLength(1);
  });

  it("should contain two input type time", () => {
    expect(TimePicker().find('input[type="time"]')).toHaveLength(2);
  });

  it("should be toggle disabled prop startDate", () => {
    expect(StartInput().prop("disabled")).toBeTruthy();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      startDateTimestamp: 1,
    }));

    wrapper = mount(<RangePicker />);

    expect(StartInput().prop("disabled")).toBeFalsy();
  });

  it("should be toggle disabled prop endDate", () => {
    expect(EndInput().prop("disabled")).toBeTruthy();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      endDateTimestamp: 1,
    }));

    wrapper = mount(<RangePicker />);

    expect(EndInput().prop("disabled")).toBeFalsy();
  });

  it("should be set value startDate", () => {
    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      startTimeString: "10:10:10",
    }));

    wrapper = mount(<RangePicker />);

    expect(StartInput().prop("value")).toBe("10:10:10");

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      startTimeString: "20:10:10",
    }));

    wrapper = mount(<RangePicker />);

    expect(StartInput().prop("value")).toBe("20:10:10");
  });

  it("should be set value endDate", () => {
    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      endTimeString: "10:10:10",
    }));

    wrapper = mount(<RangePicker />);

    expect(EndInput().prop("value")).toBe("10:10:10");

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      endTimeString: "20:10:10",
    }));

    wrapper = mount(<RangePicker />);

    expect(EndInput().prop("value")).toBe("20:10:10");
  });

  it("should call setStartTimeStringHandler after change start input", () => {
    const setStartTimeStringHandler = jest.fn();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      setStartTimeStringHandler,
    }));

    wrapper = mount(<RangePicker />);

    const value = "00:00:00";

    StartInput().simulate("change", { target: { value } });

    expect(setStartTimeStringHandler).toHaveBeenCalled();

    const [[result]] = setStartTimeStringHandler.mock.calls;

    expect(result).toBe(value);
  });

  it("should call setEndTimeStringHandler after change end input", () => {
    const setEndTimeStringHandler = jest.fn();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      setEndTimeStringHandler,
    }));

    wrapper = mount(<RangePicker />);

    const value = "00:00:00";

    EndInput().simulate("change", { target: { value } });

    expect(setEndTimeStringHandler).toHaveBeenCalled();

    const [[result]] = setEndTimeStringHandler.mock.calls;

    expect(result).toBe(value);
  });
});
