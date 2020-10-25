import React from "react";
import { shallow, mount } from "enzyme";

import RangePicker from "./RangePicker";
import { DayProvider } from "../../contexts/day";

describe("RangePicker", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  it("should render", () => {
    component = mount(<RangePicker />, {
      wrappingComponent: DayProvider,
    });
    /* console.log(component.debug()); */
    /* expect(component).toHaveLength(1); */
  });

  /* beforeEach(() => {
    component = shallow(<RangePicker />);
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(component.find("Control")).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(component.find("CalendarContainer")).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(component.find("TimePicker")).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(component.find("BottomBar")).toHaveLength(1);
  }); */
});
