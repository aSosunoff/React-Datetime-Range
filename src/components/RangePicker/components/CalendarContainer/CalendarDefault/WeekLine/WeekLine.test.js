import React from "react";
import { mount } from "enzyme";

import { getWeeksNameLocales } from "../../../../utils/dateHalper";

import WeekLine from './WeekLine';

describe("WeekLine", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WeekLine />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain 7 div with name week - locales default", () => {
    const weekLine = getWeeksNameLocales(wrapper.prop("locales"));
    const weekName = wrapper.children().children();

    expect(weekName).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(weekName.at(i).text());
    }
  });

  it("should contain 7 div with name week - locales (en)", () => {
    wrapper.setProps({ locales: "en" });

    wrapper.update();

    const weekLine = getWeeksNameLocales(wrapper.prop("locales"));
    const weekName = wrapper.children().children();

    expect(weekName).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(weekName.at(i).text());
    }
  });
});
