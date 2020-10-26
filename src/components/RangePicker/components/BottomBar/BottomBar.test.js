import React from "react";
import { mount } from "enzyme";

import BottomBar from "./BottomBar";

describe("BottomBar", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-test-id="${dataId}"]`);

  const getTitle = () => getByDataId("bottom-bar-title");
  const getApplyButton = () => getByDataId("bottom-bar-apply-button");
  const getResetButton = () => getByDataId("bottom-bar-clear-button");

  beforeEach(() => {
    component = mount(<BottomBar />);
  });

  it("should render", () => {
    expect(getByDataId("bottom-bar")).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(getTitle()).toHaveLength(0);
  });

  it("should render with title", () => {
    component.setProps({ startDate: new Date() });
    expect(getTitle()).toHaveLength(1);
    component.setProps({ startDate: new Date(), endDate: new Date() });
    expect(getTitle()).toHaveLength(1);
  });

  it("should contain apply button", () => {
    expect(getApplyButton()).toHaveLength(1);
  });

  it("should contain reset button", () => {
    expect(getResetButton()).toHaveLength(1);
  });

  it("should call applyHandler after click apply button", () => {
    const callback = jest.fn();
    component.setProps({ applyHandler: callback });
    getApplyButton().simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it("should call resetHandler after click reset button", () => {
    const callback = jest.fn();
    component.setProps({ resetHandler: callback });
    getResetButton().simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
