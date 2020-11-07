import React from "react";
import { mount } from "enzyme";

import DayDefault from "./DayDefault";
import { withContext } from "../../../../HOC/withContext";
import { HoverDayProvider } from "../../../../contexts/hoverDayContext";
import { compose } from "../../../../utils/compose";
import { RangeProvider } from "../../../../contexts/rangeContext";

describe("Day", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const DayDefaultComponent = () => wrapper.find("DayDefault");

  const props = {
    number: 1,
    dateTimestamp: new Date(2020, 0, 1).getTime(),
  };

  beforeEach(() => {
    const WithHoverDayProvider = compose(
      withContext(RangeProvider),
      withContext(HoverDayProvider)
    )(DayDefault);
    wrapper = mount(<WithHoverDayProvider {...props} />);
  });

  it("should render button", () => {
    expect(DayDefaultComponent()).toHaveLength(1);
  });

  it("should contain number", () => {
    wrapper.setProps({ number: 1 });
    expect(DayDefaultComponent().text()).toBe("1");

    wrapper.setProps({ number: 2 });
    expect(DayDefaultComponent().text()).toBe("2");

    wrapper.setProps({ number: 3 });
    expect(DayDefaultComponent().text()).toBe("3");
  });

  it("should set gridColumnStart style", () => {
    wrapper.setProps({ gridColumnStart: 1 });
    expect(DayDefaultComponent().getDOMNode().style.gridColumnStart).toBe("1");
    wrapper.setProps({ gridColumnStart: 2 });
    expect(DayDefaultComponent().getDOMNode().style.gridColumnStart).toBe("2");
  });
});
