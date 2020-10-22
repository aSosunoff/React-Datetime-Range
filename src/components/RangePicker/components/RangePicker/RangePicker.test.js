import React from "react";
import { shallow, mount } from "enzyme";

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
  });

  it("should call applyHandler", () => {
    const props = {
      onRangeSelected: jest.fn(),
      onClose: jest.fn(),
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 0, 5),
    };

    component = shallow(<RangePicker {...props} />);

    getByDataId("apply-button").simulate("click");

    expect(props.onRangeSelected).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();

    const [[rangeApplyResult]] = props.onRangeSelected.mock.calls;

    expect(rangeApplyResult.startDate.getTime()).toBe(
      props.startDate.getTime()
    );
    expect(rangeApplyResult.endDate.getTime()).toBe(props.endDate.getTime());
  });

  it("should call resetHandler", async () => {
    const props = {
      onRangeSelected: jest.fn(),
      onClose: jest.fn(),
      startDate: new Date(2020, 1, 1),
      endDate: new Date(2020, 1, 5),
    };

    component = shallow(<RangePicker {...props} />);

    getByDataId("clear-button").simulate("click");
    getByDataId("apply-button").simulate("click");

    expect(props.onRangeSelected).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();

    const [[rangeResetResult]] = props.onRangeSelected.mock.calls;

    expect(rangeResetResult.startDate).toBe(null);
    expect(rangeResetResult.endDate).toBe(null);
  });
});
