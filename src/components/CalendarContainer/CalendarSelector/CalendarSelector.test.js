import React from "react";
import { mount } from "enzyme";
import CalendarSelector from "./CalendarSelector";

jest.mock("../CalendarDefault", () => ({ children }) => <div>{children}</div>);

describe("CalendarSelector", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CalendarSelector
        changeMonthHandler={jest.fn()}
        changeYearHandler={jest.fn()}
        date={new Date(2020, 0)}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain two select element", () => {
    expect(wrapper.find("select")).toHaveLength(2);
  });

  it("should call changeMonthHandler after select month", () => {
    const changeMonthHandler = jest.fn();

    const value = 1;

    wrapper.setProps({ changeMonthHandler });

    wrapper
      .find("select")
      .at(0)
      .simulate("change", {
        target: {
          options: {
            0: { value },
            selectedIndex: 0,
          },
        },
      });

    expect(changeMonthHandler).toHaveBeenCalled();

    const [[result]] = changeMonthHandler.mock.calls;

    expect(result).toBe(value);
  });

  it("should call changeYearHandler after select year", () => {
    const changeYearHandler = jest.fn();

    const value = 1;

    wrapper.setProps({ changeYearHandler });

    wrapper
      .find("select")
      .at(1)
      .simulate("change", {
        target: {
          options: {
            0: { value },
            selectedIndex: 0,
          },
        },
      });

    expect(changeYearHandler).toHaveBeenCalled();

    const [[result]] = changeYearHandler.mock.calls;

    expect(result).toBe(value);
  });
});
