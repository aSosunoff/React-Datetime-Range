import React from "react";
import { mount } from "enzyme";

import { withContext } from "../../../../HOC/withContext";
import { HoverDayProvider } from "../../../../contexts/hoverDayContext";
import { compose } from "../../../../utils/compose";
import { RangeProvider } from "../../../../contexts/rangeContext";

jest.mock("../../../../contexts/rangeContext");
jest.mock("../../../../contexts/hoverDayContext");

const DayDefault = compose(
  withContext(HoverDayProvider),
  withContext(RangeProvider)
)(require("./DayDefault").default);

describe("DayDefault", () => {
  let wrapper;

  const DayDefaultWrapper = () => wrapper.find("DayDefault");

  const rangeContext = () => require("../../../../contexts/rangeContext");
  const rangeContextActual = () =>
    jest.requireActual("../../../../contexts/rangeContext");

  const hoverDayContext = () => require("../../../../contexts/hoverDayContext");
  const hoverDayContextActual = () =>
    jest.requireActual("../../../../contexts/hoverDayContext");

  beforeEach(() => {
    const _rangeContext = rangeContext();
    const _rangeContextActual = rangeContextActual();

    for (const key in _rangeContext) {
      if (_rangeContext[key].mockImplementation)
        _rangeContext[key].mockImplementation(_rangeContextActual[key]);
    }

    const _hoverDayContext = hoverDayContext();
    const _hoverDayContextActual = hoverDayContextActual();

    for (const key in _hoverDayContext) {
      if (_hoverDayContext[key].mockImplementation)
        _hoverDayContext[key].mockImplementation(_hoverDayContextActual[key]);
    }

    wrapper = mount(
      <DayDefault number={1} dateTimestamp={new Date(2020, 0, 1).getTime()} />
    );
  });

  it("should render button", () => {
    expect(DayDefaultWrapper()).toHaveLength(1);
  });

  it("should contain number", () => {
    wrapper.setProps({ number: 1 });
    expect(DayDefaultWrapper().text()).toBe("1");

    wrapper.setProps({ number: 2 });
    expect(DayDefaultWrapper().text()).toBe("2");

    wrapper.setProps({ number: 3 });
    expect(DayDefaultWrapper().text()).toBe("3");
  });

  it("should set gridColumnStart style", () => {
    wrapper.setProps({ gridColumnStart: 1 });
    expect(DayDefaultWrapper().getDOMNode().style.gridColumnStart).toBe("1");

    wrapper.setProps({ gridColumnStart: 2 });
    expect(DayDefaultWrapper().getDOMNode().style.gridColumnStart).toBe("2");
  });

  it("should call setRangeHandler aften click button", () => {
    const setRangeHandler = jest.fn();

    rangeContext().useRangeContext.mockImplementation(() => ({
      ...rangeContextActual().useRangeContext(),
      setRangeHandler,
    }));

    const dateTimestamp = new Date(2020, 0, 1).getTime();

    wrapper = mount(
      <DayDefault
        number={1}
        dateTimestamp={dateTimestamp}
        isCurrentMonth={true}
      />
    );

    DayDefaultWrapper().find("button").simulate("click");

    expect(setRangeHandler).toHaveBeenCalled();

    const [[result]] = setRangeHandler.mock.calls;

    expect(result).toBe(dateTimestamp);
  });

  it("should call setHoverDayTimestamp after hover to button", () => {
    jest.useFakeTimers();

    const setHoverDayTimestamp = jest.fn();

    hoverDayContext().useHoverDayContext.mockImplementation(() => ({
      ...hoverDayContextActual().useHoverDayContext(),
      setHoverDayTimestamp,
    }));

    const dateTimestamp = new Date(2020, 0, 1).getTime();

    wrapper = mount(
      <DayDefault
        number={1}
        dateTimestamp={dateTimestamp}
        isCurrentMonth={true}
      />
    );

    DayDefaultWrapper().find("button").simulate("mouseenter");

    jest.advanceTimersByTime(80);

    expect(setHoverDayTimestamp).toHaveBeenCalled();

    const [[result]] = setHoverDayTimestamp.mock.calls;

    expect(result).toBe(dateTimestamp);

    jest.useRealTimers();
  });
});
