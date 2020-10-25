import React from "react";
import { mount } from "enzyme";

import TimePicker from "./TimePicker";

describe("TimePicker", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const timePickerStart = () => getByDataId("time-picker-start");
  const timePickerEnd = () => getByDataId("time-picker-end");

  const buildWrapperComponent = (props) => {
    component = mount(<TimePicker {...props} />);
  };

  beforeEach(() => {
    buildWrapperComponent();
  });

  it("should render", () => {
    expect(getByDataId("time-picker")).toHaveLength(1);
  });

  it("should contain two input type time", () => {
    expect(component.find('input[type="time"]')).toHaveLength(2);
  });

  it("should contain props", () => {
    const props = {
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 1, 1),
    };
    buildWrapperComponent(props);
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
    expect(timePickerStart().prop("disabled")).toBeTruthy();
    setProp("startDate", new Date());
    expect(timePickerStart().prop("disabled")).toBeFalsy();
  });

  it("should be toggle disabled prop endDate", () => {
    expect(timePickerEnd().prop("disabled")).toBeTruthy();
    setProp("endDate", new Date());
    expect(timePickerEnd().prop("disabled")).toBeFalsy();
  });

  it("should be set value startDate", () => {
    setProp("startDate", new Date(0, 0, 0, 10, 10, 10));
    expect(timePickerStart().prop("value")).toBe("10:10:10");
    setProp("startDate", new Date(0, 0, 0, 20, 10, 10));
    expect(timePickerStart().prop("value")).toBe("20:10:10");
  });

  it("should be set value endDate", () => {
    setProp("endDate", new Date(0, 0, 0, 10, 10, 10));
    expect(timePickerEnd().prop("value")).toBe("10:10:10");
    setProp("endDate", new Date(0, 0, 0, 20, 10, 10));
    expect(timePickerEnd().prop("value")).toBe("20:10:10");
  });

  it("should be call onSetTimeStart", () => {
    const timeValue = [10, 10, 10];

    const callback = jest.fn();
    setProp("onSetTimeStart", callback);

    timePickerStart().simulate("change", {
      target: { value: timeValue.join(":") },
    });

    expect(callback).toHaveBeenCalled();

    const [[h, m, s]] = callback.mock.calls;
    const [hV, mV, sV] = timeValue;

    expect(h).toBe(hV);
    expect(m).toBe(mV);
    expect(s).toBe(sV);
  });

  it("should be call onSetTimeEnd", () => {
    const timeValue = [10, 10, 10];

    const callback = jest.fn();
    setProp("onSetTimeEnd", callback);

    timePickerEnd().simulate("change", {
      target: { value: timeValue.join(":") },
    });

    expect(callback).toHaveBeenCalled();

    const [[h, m, s]] = callback.mock.calls;
    const [hV, mV, sV] = timeValue;

    expect(h).toBe(hV);
    expect(m).toBe(mV);
    expect(s).toBe(sV);
  });

  it("should be call onSetFocus after call onFocus on inputStart", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerStart().simulate("focus");
    expect(callback).toHaveBeenCalled();
  });

  it("should be call onSetBlur after call onBlur on inputStart", () => {
    const callback = jest.fn();
    setProp("onSetBlur", callback);
    timePickerStart().simulate("blur");
    expect(callback).toHaveBeenCalled();
  });

  it("should be call onSetFocus after call onBlur on inputEnd", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerEnd().simulate("focus");
    expect(callback).toHaveBeenCalled();
  });

  it("should be call onSetBlur after call onBlur on inputEnd", () => {
    const callback = jest.fn();
    setProp("onSetBlur", callback);
    timePickerEnd().simulate("blur");
    expect(callback).toHaveBeenCalled();
  });
});
