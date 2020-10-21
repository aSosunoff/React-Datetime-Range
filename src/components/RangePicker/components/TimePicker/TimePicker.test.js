import React from "react";
import { mount } from "enzyme";

import TimePicker from "./TimePicker";

describe("TimePicker", () => {
  let component, props;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

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
    expect(component.find('input[type="time"]')).toHaveLength(2);
  });

  it("should contain props", () => {
    component = mount(<TimePicker {...props} />);
    expect(getProp("startDate")).toBe(props.startDate);
    expect(getProp("endDate")).toBe(props.endDate);
  });

  it("should set props", () => {
    const date = new Date();

    setProp("startDate", date);
    expect(getProp("startDate")).toBe(date);

    setProp("endDate", date);
    expect(getProp("endDate")).toBe(date);
  });

  it("should be toggle disabled prop startDate", () => {
    expect(getByDataId("time-picker-start").prop("disabled")).toBeTruthy();
    setProp("startDate", new Date());
    expect(getByDataId("time-picker-start").prop("disabled")).toBeFalsy();
  });

  it("should be toggle disabled prop endDate", () => {
    expect(getByDataId("time-picker-end").prop("disabled")).toBeTruthy();
    setProp("endDate", new Date());
    expect(getByDataId("time-picker-end").prop("disabled")).toBeFalsy();
  });
});
