import React from "react";
import { mount /* , shallow */ } from "enzyme";

import Day from "./Day";
import { /* DayContext, */ DayProvider } from "../../../../contexts/day";
import { withDayContext } from "../../../../HOC/withDayContext";
/* import { withDayContext } from "../../../../HOC/withDayContext"; */

describe("Day", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const button = () => component.find("button");

  const props = {
    number: 1,
    date: new Date(2020, 0, 1),
  };

  beforeEach(() => {
    const WithDayContext = withDayContext(Day);
    component = mount(<WithDayContext {...props} />);
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

  it("should contain class start", () => {
    setProp("type", "start");
    expect(button().prop("className")).toContain("start");
  });

  it("should contain class current", () => {
    setProp("isCurrent", true);
    expect(button().prop("className")).toContain("current");
  });

  it("should call setDay", () => {
    /* button().simulate("click");
    console.log(component.debug()); */
    /* const WithDayContext = withDayContext(Day);
    const wrapper = shallow(<WithDayContext {...props} />);
    const provider = wrapper.dive(); */
    /* console.log(provider.prop('value').day); */
    /* const button = wrapper.find("button"); */
    /* console.log(
      wrapper
        .find("Day")
        .shallow({
          wrappingComponent: DayContext.Provider,
          wrappingComponentProps: { value: { setDay: () => {}, day: 1 } },
        })
        .debug()
    ); */
    /* const callback = jest.fn();
    const date = new Date(2020, 1, 1);

    const provider = component.getWrappingComponent();
    provider.setProps({ setDayHandler: callback });

    setProp("date", date);
    button().simulate("click");

    const [[result]] = callback.mock.calls;
    expect(result.getTime()).toBe(date.getTime()); */
  });
});
