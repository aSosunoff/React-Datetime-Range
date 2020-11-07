import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const RangePickerComponent = () => wrapper.find("RangePicker");

  const Control = () => wrapper.find("Control");
  const ControlRight = () => getByDataId(Control(), "control-right");
  const ControlLeft = () => getByDataId(Control(), "control-left");

  const CalendarContainer = () => wrapper.find("CalendarContainer");
  const TimePicker = () => wrapper.find("TimePicker");

  const BottomBar = () => wrapper.find("BottomBar");
  const BottomBarApplyButton = () =>
    getByDataId(BottomBar(), "bottom-bar-apply-button");

  const CalendarSelector = () => CalendarContainer().find("CalendarSelector");

  const CalendarSimple = () => CalendarContainer().find("CalendarSimple");
  const CalendarSimpleTitle = () =>
    getByDataId(CalendarSimple(), "calendar-title");

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
    expect(RangePickerComponent()).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(Control()).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(CalendarContainer()).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(TimePicker()).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(BottomBar()).toHaveLength(1);
  });

  it("should contain CalendarSelector and CalendarSimple", () => {
    expect(CalendarSelector()).toHaveLength(1);
    expect(CalendarSimple()).toHaveLength(1);
  });

  it("should raise range after apply", () => {
    CalendarSelector()
      .find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    CalendarSelector()
      .find("DayDefault")
      .find({ number: 10, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    BottomBarApplyButton().simulate("click");

    const [[{ startDate, endDate }]] = props.onRangeSelected.mock.calls;

    expect(startDate.getTime()).toBe(new Date(2020, 0, 1).getTime());
    expect(endDate.getTime()).toBe(new Date(2020, 0, 10).getTime());
  });

  it("should set next calendar", () => {
    let titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    ControlRight().simulate("click");

    titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 2, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });

  it("should set prev calendar", () => {
    let titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    ControlLeft().simulate("click");

    titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 0, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });
});

describe("CalendarDefault", () => {
  let wrapper;

  const CalendarDefault = () => wrapper.find("CalendarDefault");

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
    CalendarDefault().forEach((calendar) => {
      expect(calendar).toHaveLength(1);
    });
  });

  it("should contain WeekLine", () => {
    CalendarDefault().forEach((calendar) => {
      expect(calendar.find("WeekLine")).toHaveLength(1);
    });
  });

  it("should contain day container", () => {
    CalendarDefault().forEach((calendar) => {
      expect(
        calendar.find("[data-test-id='calendar-default-day-container']")
      ).toHaveLength(1);
    });
  });

  it("should contain length 31 day", () => {
    expect(
      CalendarDefault()
        .at(0)
        .find("[data-test-id='calendar-default-day-container']")
        .find("DayDefault")
        .find({ isCurrentMonth: true })
    ).toHaveLength(31);
  });
});

describe("CalendarContainer", () => {
  let wrapper;

  const CalendarContainer = () => wrapper.find("CalendarContainer");

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
    expect(CalendarContainer()).toHaveLength(1);
  });

  it("should contain style default", () => {
    expect(CalendarContainer().getDOMNode().style.gridTemplateColumns).toBe(
      "repeat(2, 1fr)"
    );
  });
});
