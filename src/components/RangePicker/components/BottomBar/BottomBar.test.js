import React from "react";
import { mount } from "enzyme";
import { compose } from "../../utils/compose";
import { withContext } from "../../HOC/withContext";
import { RangeProvider } from "../../contexts/rangeContext";

/* import RangePicker from "../RangePicker"; */

jest.mock("../../contexts/rangeContext");
/* jest.mock("./BottomBar.js"); */

const BottomBar = compose(withContext(RangeProvider))(
  require("./BottomBar").default
);

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

  /* const BottomBar = () => wrapper.find("BottomBar"); */
  const Title = () => getByDataId(wrapper, "bottom-bar-title");
  const ApplyButton = () => getByDataId(wrapper, "bottom-bar-apply-button");
  const ResetButton = () => getByDataId(wrapper, "bottom-bar-clear-button");

  const rangeContext = () => require("../../contexts/rangeContext");
  const requireActual = () => jest.requireActual("../../contexts/rangeContext");

  beforeEach(() => {
    const _rangeContext = rangeContext();
    const _requireActual = requireActual();

    for (const key in _rangeContext) {
      if (_rangeContext[key].mockImplementation)
        _rangeContext[key].mockImplementation(_requireActual[key]);
    }

    wrapper = mount(<BottomBar />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(Title()).toHaveLength(0);
  });

  it("should render with title start date", () => {
    const startDate = new Date(2020, 0, 1, 0, 0, 0);

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      startDate,
    }));

    wrapper = mount(<BottomBar />);

    expect(Title()).toHaveLength(1);

    expect(Title().text()).toBe(format(wrapper.prop("locales"), startDate));
  });

  it("should render with title start and end date", () => {
    const startDate = new Date(2020, 0, 1, 0, 0, 0);
    const endDate = new Date(2020, 0, 1, 0, 0, 0);

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      startDate,
      endDate,
    }));

    wrapper = mount(<BottomBar />);

    expect(Title()).toHaveLength(1);

    expect(Title().text()).toBe(
      `${format(wrapper.prop("locales"), startDate)} - ${format(
        wrapper.prop("locales"),
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
    const applyHandler = jest.fn();

    wrapper.setProps({ applyHandler });

    ApplyButton().simulate("click");

    expect(applyHandler).toHaveBeenCalled();
  });

  it("should call resetHandler", () => {
    const resetHandler = jest.fn();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...requireActual().useRangeContext(),
      resetHandler,
    }));

    wrapper = mount(<BottomBar />);

    ResetButton().simulate("click");

    expect(resetHandler).toHaveBeenCalled();
  });
});
