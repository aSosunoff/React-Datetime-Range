import React from "react";
import { mount } from "enzyme";

import RangePicker from "../../RangePicker";

describe("CalendarSimple", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const CalendarSimple = () => wrapper.find("CalendarSimple");
  const Title = () => getByDataId(CalendarSimple(), "calendar-title");

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
    expect(CalendarSimple()).toHaveLength(1);
  });

  it("should contain title (default)", () => {
    let localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(CalendarSimple().prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(Title().find("time").text()).toBe(localeString);
  });

  it("should contain title (en)", () => {
    wrapper.setProps({ locales: "en" });

    const localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(CalendarSimple().prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(Title().find("time").text()).toBe(localeString);
  });
});
