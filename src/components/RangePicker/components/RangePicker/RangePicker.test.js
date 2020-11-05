import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    const CalendarContainer = wrapper.find("CalendarContainer");

    const CalendarSelector = CalendarContainer.find("CalendarSelector");

    expect(CalendarSelector).toHaveLength(1);

    const CalendarSimple = CalendarContainer.find("CalendarSimple");

    expect(CalendarSimple).toHaveLength(1);
  });

  it("should raise range after apply", () => {
    const CalendarContainer = wrapper.find("CalendarContainer");

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

  it("should set next calendar", () => {
    let titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    wrapper
      .find("Control")
      .find('[data-test-id="control-right"]')
      .simulate("click");

    titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 2, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });

  it("should set prev calendar", () => {
    let titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    wrapper
      .find("Control")
      .find('[data-test-id="control-left"]')
      .simulate("click");

    titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 0, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });
});
