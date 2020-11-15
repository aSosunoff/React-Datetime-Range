import React from "react";
import { mount } from "enzyme";
import CalendarDefault from "./CalendarDefault";

jest.mock("./DayDefault/", () => ({ index }) => (
  <div className="DayDefault">{index}</div>
));

describe("CalendarDefault", () => {
  let wrapper;

  const days = new Array(10).fill(null).map((_, index) => ({
    index,
  }));

  const Title = () => <div className="Title">Title</div>;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const WeekLine = () => wrapper.find("WeekLine");
  const CalendarDefaultDayContainer = () =>
    getByDataId(wrapper, "calendar-default-day-container");

  beforeEach(() => {
    wrapper = mount(
      <CalendarDefault days={days}>
        <Title />
      </CalendarDefault>
    );
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain Title", () => {
    expect(wrapper.find(".Title")).toHaveLength(1);
  });

  it("should contain WeekLine", () => {
    expect(WeekLine()).toHaveLength(1);
  });

  it("should contain day container", () => {
    expect(CalendarDefaultDayContainer()).toHaveLength(1);
  });

  it("should contain length 31 day", () => {
    expect(CalendarDefaultDayContainer().find(".DayDefault")).toHaveLength(10);
  });
});
