import React from "react";
import { mount } from "enzyme";
import CalendarSimple from "./CalendarSimple";

jest.mock("../CalendarDefault", () => ({ children }) => <div>{children}</div>);

describe("CalendarSimple", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);
  const Title = () => getByDataId(wrapper, "calendar-title");

  const props = {
    date: new Date(2020, 0),
    locales: "ru",
  };

  beforeEach(() => {
    wrapper = mount(<CalendarSimple {...props} />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain title (default)", () => {
    const localeString = wrapper
      .prop("date")
      .toLocaleString(wrapper.prop("locales"), {
        month: "long",
        year: "numeric",
      });

    expect(Title().find("time").text()).toBe(localeString);
  });

  it("should contain title (en)", () => {
    wrapper.setProps({ locales: "en" });

    const localeString = wrapper
      .prop("date")
      .toLocaleString(wrapper.prop("locales"), {
        month: "long",
        year: "numeric",
      });

    expect(Title().find("time").text()).toBe(localeString);
  });
});
