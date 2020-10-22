import React from "react";
import { shallow } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  beforeEach(() => {
    component = shallow(<RangePicker />);
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(component.find('Control')).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(component.find('CalendarContainer')).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(component.find('TimePicker')).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(component.find('BottomBar')).toHaveLength(1);
  });
});
