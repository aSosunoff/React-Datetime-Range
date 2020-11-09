import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const RangePickerComponent = () => wrapper.find("RangePicker");

  const Control = () => wrapper.find("Control");
  const ArrowRight = () => Control().find("ArrowRight");
  const ArrowLeft = () => Control().find("ArrowLeft");

  const CalendarContainer = () => wrapper.find("CalendarContainer");
  const CalendarSelectors = () => CalendarContainer().find("CalendarSelector");

  const TimePicker = () => wrapper.find("TimePicker");

  const BottomBar = () => wrapper.find("BottomBar");
  const BottomBarApplyButton = () =>
    getByDataId(BottomBar(), "bottom-bar-apply-button");

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

  it("should raise range after apply", () => {
    CalendarSelectors()
      .at(0)
      .find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    CalendarSelectors()
      .at(0)
      .find("DayDefault")
      .find({ number: 10, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    BottomBarApplyButton().simulate("click");

    const [[{ startDate, endDate }]] = props.onRangeSelected.mock.calls;

    expect(startDate.getTime()).toBe(new Date(2020, 0, 1).getTime());
    expect(endDate.getTime()).toBe(new Date(2020, 0, 10).getTime());
  });

  it("should set next month", () => {
    let monthName = () =>
      CalendarSelectors()
        .at(0)
        .find("Select")
        .at(0)
        .prop("items")
        .find(
          ({ value }) =>
            value ===
            CalendarSelectors().at(0).find("Select").at(0).prop("value")
        ).text;

    const date = CalendarSelectors().at(0).prop("date");

    expect(
      date.toLocaleString("ru", {
        month: "long",
      })
    ).toBe(monthName());

    ArrowRight().simulate("click");

    expect(
      new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleString(
        "ru",
        {
          month: "long",
        }
      )
    ).toBe(monthName());
  });

  it("should set prev calendar", () => {
    let monthName = () =>
      CalendarSelectors()
        .at(0)
        .find("Select")
        .at(0)
        .prop("items")
        .find(
          ({ value }) =>
            value ===
            CalendarSelectors().at(0).find("Select").at(0).prop("value")
        ).text;

    const date = CalendarSelectors().at(0).prop("date");

    expect(
      date.toLocaleString("ru", {
        month: "long",
      })
    ).toBe(monthName());

    ArrowLeft().simulate("click");

    expect(
      new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleString(
        "ru",
        {
          month: "long",
        }
      )
    ).toBe(monthName());
  });
});
