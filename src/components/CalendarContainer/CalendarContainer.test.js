import React from "react";
import { mount } from "enzyme";
import CalendarContainer from "./CalendarContainer";

jest.mock("../../HOC/withContext.js", () => ({
  withContext: () => (WrapperComponent) => (props) => (
    <WrapperComponent {...props} />
  ),
}));

jest.mock("../../contexts/showDateContext", () => ({
  useShowDateContext: () => ({
    setMonthHandler: jest.fn(),
    setYearHandler: jest.fn(),
  }),
}));

jest.mock("./CalendarSelector", () => () => <div>CalendarSelector</div>);

jest.mock("./CalendarSimple", () => () => <div>CalendarSimple</div>);

jest.mock("../../contexts/hoverDayContext");

jest.mock("../../hooks/useCalendar", () => ({
  useCalendar: () =>
    new Array(2).fill(null).map((_, index) => ({
      date: index,
      days: index,
    })),
}));

describe("CalendarContainer", () => {
  let wrapper;

  const rangeContext = () => require("../../contexts/hoverDayContext");

  beforeEach(() => {
    rangeContext().useHoverDayContext.mockImplementation(() => ({
      setHoverDayTimestamp: jest.fn(),
    }));
    wrapper = mount(<CalendarContainer />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain style default", () => {
    expect(wrapper.getDOMNode().style.gridTemplateColumns).toBe(
      "repeat(2, 1fr)"
    );
  });

  it("should call setHoverDayTimestamp after mouse leave", () => {
    const setHoverDayTimestamp = jest.fn();

    rangeContext().useHoverDayContext.mockImplementation(() => ({
      setHoverDayTimestamp,
    }));

    wrapper = mount(<CalendarContainer />);

    wrapper.simulate("mouseleave");

    expect(setHoverDayTimestamp).toHaveBeenCalled();

    const [[result]] = setHoverDayTimestamp.mock.calls;

    expect(result).toBeNull();
  });
});
