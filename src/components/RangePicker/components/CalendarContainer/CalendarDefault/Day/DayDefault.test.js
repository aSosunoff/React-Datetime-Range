import React from "react";
import { mount } from "enzyme";

import Day from "./DayDefault";
import { withContext } from "../../../../HOC/withContext";
import { HoverDayProvider } from "../../../../contexts/hoverDayContext";
import { compose } from "../../../../utils/compose";
import { RangeProvider } from "../../../../contexts/rangeContext";

describe("Day", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-test-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const button = () => component.find("button");

  const props = {
    number: 1,
    dateTimestamp: new Date(2020, 0, 1).getTime(),
  };

  beforeEach(() => {
    const WithHoverDayProvider = compose(
      withContext(RangeProvider),
      withContext(HoverDayProvider)
    )(Day);
    component = mount(<WithHoverDayProvider {...props} />);
  });

  it("should render button", () => {
    expect(button()).toHaveLength(1);
  });

  it("should contain number", () => {
    setProp("number", 1);
    expect(button().text()).toBe("1");

    setProp("number", 2);
    expect(button().text()).toBe("2");

    setProp("number", 3);
    expect(button().text()).toBe("3");
  });

  it("should set gridColumnStart style", () => {
    setProp("gridColumnStart", 1);
    expect(button().prop("style").gridColumnStart).toBe(1);
    setProp("gridColumnStart", 2);
    expect(button().prop("style").gridColumnStart).toBe(2);
  });
});
