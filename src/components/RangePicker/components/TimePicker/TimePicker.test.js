import React from "react";
import { mount } from "enzyme";

import TimePicker from "./TimePicker";

describe("TimePicker", () => {
  let component, props;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);

  const getValue = (prop) => component.props()[prop];
  const getStartDateValue = () => getValue("startDate");
  const getEndDateValue = () => getValue("endDate");

  const setValue = (prop, value) => component.setProps({ [prop]: value });
  const setStartDateValue = (value) => setValue("startDate", value);
  const setEndDateValue = (value) => setValue("endDate", value);

  const getTimePicker = () => getByDataId("time-picker");
  const getChildrensComponent = () =>
    getTimePicker().children('input[type="time"]');
  const getStartDateComponent = () => getChildrensComponent().childAt(0);
  const getEndDateComponent = () => getChildrensComponent().childAt(1);

  beforeEach(() => {
    component = mount(<TimePicker />);

    props = {
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 1, 1),
      setTimeFromHandler: jest.fn(),
      setTimeToHandler: jest.fn(),
    };
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain two input type time", () => {
    expect(getChildrensComponent()).toHaveLength(2);
  });

  it("should contain props", () => {
    component = mount(<TimePicker {...props} />);
    expect(getStartDateValue()).toBe(props.startDate);
    expect(getEndDateValue()).toBe(props.endDate);
  });

  it("should set props", () => {
    const date = new Date();

    setStartDateValue(date);
    expect(getStartDateValue()).toBe(date);

    setEndDateValue(date);
    expect(getEndDateValue()).toBe(date);
  });
});
