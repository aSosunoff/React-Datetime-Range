import React from "react";
import { shallow } from "enzyme";

import CalendarContainer from "./CalendarContainer";

describe("CalendarContainer", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-test-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const props = {
    showMonth: new Date(2020, 0, 1),
  };

  beforeEach(() => {
    component = shallow(<CalendarContainer {...props} />);
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain style default", () => {
    expect(component.prop("style").gridTemplateColumns).toBe("repeat(1, 1fr)");
  });

  it("should contain style for two calendars", () => {
    const calendarVisibleCount = 2;
    setProp("calendarVisibleCount", calendarVisibleCount);
    expect(component.prop("style").gridTemplateColumns).toBe(
      `repeat(${calendarVisibleCount}, 1fr)`
    );
  });
});
