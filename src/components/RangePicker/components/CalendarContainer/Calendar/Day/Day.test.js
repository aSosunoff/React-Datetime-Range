import React from "react";
import { mount } from "enzyme";

import Day from "./Day";
import { DayProvider } from "../../../../contexts/day";

describe("Day", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const button = () => component.find("button");

  const props = {
    number: 1,
    date: new Date(2020, 0, 1),
  };

  beforeEach(() => {
    component = mount(<Day {...props} />, {
      wrappingComponent: DayProvider,
    });
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should set gridColumnStart style", () => {
    setProp("gridColumnStart", 1);
    expect(button().prop("style").gridColumnStart).toBe(1);
    setProp("gridColumnStart", 2);
    expect(button().prop("style").gridColumnStart).toBe(2);
  });

  it("should contain class start", () => {
    setProp("type", "start");
    expect(button().prop("className")).toContain("start");
  });

  it("should contain class current", () => {
    setProp("isCurrent", true);
    expect(button().prop("className")).toContain("current");
  });

  it("should call setDay", () => {
    const callback = jest.fn();
    const date = new Date(2020, 1, 1);

    const provider = component.getWrappingComponent();
    provider.setProps({ setDayHandler: callback });

    setProp("date", date);
    button().simulate("click");

    const [[result]] = callback.mock.calls;
    expect(result.getTime()).toBe(date.getTime());
  });

  it("should contain number", () => {
    setProp("number", 1);
    expect(button().text()).toBe("1");

    setProp("number", 2);
    expect(button().text()).toBe("2");

    setProp("number", 3);
    expect(button().text()).toBe("3");
  });
});
