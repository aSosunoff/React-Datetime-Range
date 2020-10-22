import React from "react";
import { mount } from "enzyme";

import Calendar from "./Calendar";
import { DayProvider } from "../../../contexts/day";

describe("WeekLine", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const title = () => getByDataId("calendar-title");
  const container = () => getByDataId("calendar-container");

  const props = {
    date: new Date(2020, 0, 1),
  };

  beforeEach(() => {
    component = mount(<Calendar {...props} />, {
      wrappingComponent: DayProvider,
    });
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain title", () => {
    expect(title()).toHaveLength(1);
  });

  it("should contain WeekLine", () => {
    expect(component.find("WeekLine")).toHaveLength(1);
  });

  it("should contain container", () => {
    expect(container()).toHaveLength(1);
  });

  it("should contain title (default)", () => {
    const localesDefault = getProp("locales");
    let localeString = props.date.toLocaleString(localesDefault, {
      month: "long",
      year: "numeric",
    });
    expect(title().find("time").text()).toBe(localeString);
  });

  it("should contain title (en)", () => {
    setProp("locales", "en");
    const localeString = props.date.toLocaleString("en", {
      month: "long",
      year: "numeric",
    });
    expect(title().find("time").text()).toBe(localeString);
  });

  it("should contain length 31 day", () => {
    expect(container().children()).toHaveLength(31);
  });

  it("should contain length 29 day", () => {
    setProp("date", new Date(2020, 1, 1));
    expect(container().children()).toHaveLength(29);
  });
});
