import React from "react";
import { mount } from "enzyme";

import WeekLine from "./WeekLine";
import { getWeeksNameLocales } from "../../../../utils/dateHalper";

describe("WeekLine", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  /* const timePickerStart = () => getByDataId("time-picker-start");
  const timePickerEnd = () => getByDataId("time-picker-end"); */

  beforeEach(() => {
    component = mount(<WeekLine />);
    /* component.children */
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain 7 div with name week - locales (ru)", () => {
    const weekLine = getWeeksNameLocales("ru");
    const children = getByDataId("week-line").children();

    expect(children).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(children.at(i).text());
    }
  });

  it("should contain 7 div with name week - locales (eu)", () => {
    setProp("locales", "eu");

    const weekLine = getWeeksNameLocales("eu");
    const children = getByDataId("week-line").children();

    expect(children).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(children.at(i).text());
    }
  });

  /* it("should contain props", () => {
    const props = {
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 1, 1),
    };
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

    timePickerStart().invoke("onChange")({
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

    timePickerEnd().invoke("onChange")({
      target: { value: timeValue.join(":") },
    });

    expect(callback).toHaveBeenCalled();

    const [[h, m, s]] = callback.mock.calls;
    const [hV, mV, sV] = timeValue;

    expect(h).toBe(hV);
    expect(m).toBe(mV);
    expect(s).toBe(sV);
  });

  it("should be call onSetFocus after call onFocus on inputStart with true value", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerStart().invoke("onFocus")();
    const [[result]] = callback.mock.calls;
    expect(result).toBe(true);
  });

  it("should be call onSetFocus after call onBlur on inputStart with false value", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerStart().invoke("onBlur")();
    const [[result]] = callback.mock.calls;
    expect(result).toBe(false);
  });

  it("should be call onSetFocus after call onFocus on inputEnd with true value", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerEnd().invoke("onFocus")();
    const [[result]] = callback.mock.calls;
    expect(result).toBe(true);
  });

  it("should be call onSetFocus after call onBlur on inputEnd with false value", () => {
    const callback = jest.fn();
    setProp("onSetFocus", callback);
    timePickerEnd().invoke("onBlur")();
    const [[result]] = callback.mock.calls;
    expect(result).toBe(false);
  }); */
});
