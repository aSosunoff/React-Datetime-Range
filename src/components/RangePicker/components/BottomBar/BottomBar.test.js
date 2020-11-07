import React from "react";
import { mount } from "enzyme";

import RangePicker from "../RangePicker";

jest.mock("../../contexts/rangeContext");

const format = (locales, date) =>
  date.toLocaleString(locales, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

describe("BottomBar", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const BottomBar = () => wrapper.find("BottomBar");
  const Title = () => getByDataId(BottomBar(), "bottom-bar-title");
  const ApplyButton = () => getByDataId(BottomBar(), "bottom-bar-apply-button");
  const ResetButton = () => getByDataId(BottomBar(), "bottom-bar-clear-button");

  const rangeContext = () => require("../../contexts/rangeContext");
  const requireActual = () => jest.requireActual("../../contexts/rangeContext");

  beforeEach(() => {
    const context = rangeContext();
    const actual = requireActual();

    for (const key in context) {
      if (context[key].mockImplementation)
        context[key].mockImplementation(actual[key]);
    }

    wrapper = mount(<RangePicker />);
  });

  it("should render", () => {
    expect(BottomBar()).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(Title()).toHaveLength(0);
  });

  it("should render with title start date", () => {
    const startDate = new Date(2020, 0, 1, 0, 0, 0);

    wrapper.setProps({ startDate });
    wrapper.update();

    expect(Title()).toHaveLength(1);
    expect(Title().text()).toBe(format(BottomBar().prop("locales"), startDate));
  });

  it("should render with title start and end date", () => {
    const startDate = new Date(2020, 0, 1, 0, 0, 0);
    const endDate = new Date(2020, 0, 1, 0, 0, 0);

    wrapper.setProps({ startDate, endDate });
    wrapper.update();

    expect(Title()).toHaveLength(1);

    expect(Title().text()).toBe(
      `${format(BottomBar().prop("locales"), startDate)} - ${format(
        BottomBar().prop("locales"),
        endDate
      )}`
    );
  });

  it("should contain apply button", () => {
    expect(ApplyButton()).toHaveLength(1);
  });

  it("should contain reset button", () => {
    expect(ResetButton()).toHaveLength(1);
  });

  it("should call applyHandler prop", () => {
    const onRangeSelected = jest.fn();
    wrapper.setProps({ onRangeSelected });
    ApplyButton().simulate("click");
    expect(onRangeSelected).toHaveBeenCalled();
  });

  it("should call resetHandler", () => {
    const resetHandler = jest.fn();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      resetHandler,
    }));

    wrapper = mount(<RangePicker />);

    ResetButton().simulate("click");

    expect(resetHandler).toHaveBeenCalled();
  });
});
