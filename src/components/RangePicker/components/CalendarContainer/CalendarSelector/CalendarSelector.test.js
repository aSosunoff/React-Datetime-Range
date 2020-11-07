import React from "react";
import { mount } from "enzyme";

import RangePicker from "../../RangePicker";

describe("CalendarSelector", () => {
  let wrapper;

  const CalendarSelector = () => wrapper.find("CalendarSelector");

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
    expect(CalendarSelector()).toHaveLength(1);
  });

  it("should contain two select element", () => {
    expect(CalendarSelector().find("select")).toHaveLength(2);
  });
});
