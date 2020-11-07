import React from "react";
import { mount } from "enzyme";

import RangePicker from "../../../RangePicker";

import { getWeeksNameLocales } from "../../../../utils/dateHalper";

describe("WeekLine", () => {
  let wrapper;

  const WeekLine = () => wrapper.find("WeekLine").at(0);

  beforeEach(() => {
    wrapper = mount(<RangePicker />);
  });

  it("should render", () => {
    expect(WeekLine()).toHaveLength(1);
  });

  it("should contain 7 div with name week - locales default", () => {
    const weekLine = getWeeksNameLocales(WeekLine().prop("locales"));
    const weekName = WeekLine().children().children();

    expect(weekName).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(weekName.at(i).text());
    }
  });

  it("should contain 7 div with name week - locales (en)", () => {
    wrapper.setProps({ locales: "en" });

    wrapper.update();

    const weekLine = getWeeksNameLocales(WeekLine().prop("locales"));
    const weekName = WeekLine().children().children();

    expect(weekName).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(weekName.at(i).text());
    }
  });
});
