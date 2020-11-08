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
});
