import React from "react";
import { mount } from "enzyme";

import WeekLine from "./WeekLine";
import { getWeeksNameLocales } from "../../../../utils/dateHalper";

describe("WeekLine", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  beforeEach(() => {
    component = mount(<WeekLine />);
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain 7 div with name week - locales default", () => {
    const defaultPropLocales = getProp('locales')
    const weekLine = getWeeksNameLocales(defaultPropLocales);
    const children = getByDataId("week-line").children();

    expect(children).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(children.at(i).text());
    }
  });

  it("should contain 7 div with name week - locales (eu)", () => {
    setProp("locales", "eu");

    const weekLine = getWeeksNameLocales("eu");
    const children = getByDataId("week-line").children();

    expect(children).toHaveLength(7);

    for (let i = 0; i < weekLine.length; i++) {
      expect(weekLine[i]).toBe(children.at(i).text());
    }
  });
});
