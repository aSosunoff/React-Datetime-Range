import React from "react";
import { mount } from "enzyme";

import RangePicker from "../RangePicker";

describe("CalendarContainer", () => {
  let wrapper;

  const CalendarContainer = () => wrapper.find("CalendarContainer");

  beforeEach(() => {
    wrapper = mount(<RangePicker />);
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
