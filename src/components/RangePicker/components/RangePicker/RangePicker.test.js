import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);
  /* const getProp = (prop) => wrapper.prop(prop);
  const setProp = (prop, value) => wrapper.setProps({ [prop]: value }); */

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(getByDataId("range-picker")).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(wrapper.find("Control")).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(wrapper.find("CalendarContainer")).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(wrapper.find("TimePicker")).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(wrapper.find("BottomBar")).toHaveLength(1);
  });

  it("should contain CalendarSelector and CalendarSimple", () => {
    const CalendarContainer = getByDataId("calendar-container");

    const CalendarSelector = CalendarContainer.find("CalendarSelector");

    expect(CalendarSelector).toHaveLength(1);

    const CalendarSimple = CalendarContainer.find("CalendarSimple");

    expect(CalendarSimple).toHaveLength(1);
  });

  it("should raise range after apply", () => {
    const CalendarContainer = getByDataId("calendar-container");

    const CalendarSelector = CalendarContainer.find("CalendarSelector");

    CalendarSelector.find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    CalendarSelector.find("DayDefault")
      .find({ number: 10, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    getByDataId("bottom-bar-apply-button").simulate("click");

    const [[{ startDate, endDate }]] = props.onRangeSelected.mock.calls;

    expect(startDate.getTime()).toBe(new Date(2020, 0, 1).getTime());
    expect(endDate.getTime()).toBe(new Date(2020, 0, 10).getTime());
  });

  /* it("should set focus after set start date", () => {
    const container = document.createElement("div");
    document.body.append(container);
    document.body.focus();

    wrapper = mount(<RangePicker {...props} />, { attachTo: container });

    const CalendarContainer = getByDataId("calendar-container");

    CalendarContainer
      .find("CalendarSelector")
      .find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    expect(document.activeElement).toBe(
      getByDataId("time-picker-start").getDOMNode()
    );
  }); */

  /* it("should set next calendar", () => {
    const Calendar = wrapper.find("Calendar").at(0);
    const calendar_title = Calendar.find('[data-test-id="calendar-title"]');

    expect(
      props.startDate.toLocaleString("ru", { month: "long", year: "numeric" })
    ).toBe(calendar_title.text());

    getByDataId("control-right").simulate("click");

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(calendar_title.text());
  }); */

  /* it("should set prev calendar", () => {
    const Calendar = wrapper.find("Calendar").at(0);
    const calendar_title = Calendar.find('[data-test-id="calendar-title"]');

    expect(
      props.startDate.toLocaleString("ru", { month: "long", year: "numeric" })
    ).toBe(calendar_title.text());

    getByDataId("control-left").simulate("click");

    expect(
      new Date(2019, 11, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(calendar_title.text());
  }); */
});
