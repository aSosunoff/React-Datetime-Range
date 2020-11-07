import React from "react";
import { mount } from "enzyme";

import RangePicker from "../../RangePicker";

describe("CalendarDefault", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const CalendarDefault = () => wrapper.find("CalendarDefault").at(0);
  const CalendarDefaultDayContainer = () =>
    getByDataId(CalendarDefault(), "calendar-default-day-container");
  const WeekLine = () => CalendarDefault().find("WeekLine");

  beforeEach(() => {
    wrapper = mount(<RangePicker />);
  });

  it("should render", () => {
    expect(CalendarDefault()).toHaveLength(1);
  });

  it("should contain WeekLine", () => {
    expect(WeekLine()).toHaveLength(1);
  });

  it("should contain day container", () => {
    expect(CalendarDefaultDayContainer()).toHaveLength(1);
  });

  it("should contain length 31 day", () => {
    wrapper.setProps({ startDate: new Date(2020, 0), isOpen: true });

    wrapper.update();

    expect(
      CalendarDefaultDayContainer()
        .find("DayDefault")
        .find({ isCurrentMonth: true })
    ).toHaveLength(31);
  });
});
