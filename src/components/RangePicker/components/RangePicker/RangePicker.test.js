import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const RangePickerComponent = () => wrapper.find("RangePicker");

  const Control = () => wrapper.find("Control");
  const ControlRight = () => getByDataId(Control(), "control-right");
  const ControlLeft = () => getByDataId(Control(), "control-left");

  const CalendarContainer = () => wrapper.find("CalendarContainer");
  const TimePicker = () => wrapper.find("TimePicker");

  const BottomBar = () => wrapper.find("BottomBar");
  const BottomBarApplyButton = () =>
    getByDataId(BottomBar(), "bottom-bar-apply-button");

  const CalendarSelector = () => CalendarContainer().find("CalendarSelector");

  const CalendarSimple = () => CalendarContainer().find("CalendarSimple");
  const CalendarSimpleTitle = () =>
    getByDataId(CalendarSimple(), "calendar-title");

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(RangePickerComponent()).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(Control()).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(CalendarContainer()).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(TimePicker()).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(BottomBar()).toHaveLength(1);
  });

  it("should contain CalendarSelector and CalendarSimple", () => {
    expect(CalendarSelector()).toHaveLength(1);
    expect(CalendarSimple()).toHaveLength(1);
  });

  it("should raise range after apply", () => {
    CalendarSelector()
      .find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    CalendarSelector()
      .find("DayDefault")
      .find({ number: 10, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    BottomBarApplyButton().simulate("click");

    const [[{ startDate, endDate }]] = props.onRangeSelected.mock.calls;

    expect(startDate.getTime()).toBe(new Date(2020, 0, 1).getTime());
    expect(endDate.getTime()).toBe(new Date(2020, 0, 10).getTime());
  });

  it("should set next calendar", () => {
    let titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    ControlRight().simulate("click");

    titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 2, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });

  it("should set prev calendar", () => {
    let titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    ControlLeft().simulate("click");

    titleText = CalendarSimpleTitle().text();

    expect(
      new Date(2020, 0, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });
});

describe("CalendarDefault", () => {
  let wrapper;

  const CalendarDefault = () => wrapper.find("CalendarDefault");

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    CalendarDefault().forEach((calendar) => {
      expect(calendar).toHaveLength(1);
    });
  });

  it("should contain WeekLine", () => {
    CalendarDefault().forEach((calendar) => {
      expect(calendar.find("WeekLine")).toHaveLength(1);
    });
  });

  it("should contain day container", () => {
    CalendarDefault().forEach((calendar) => {
      expect(
        calendar.find("[data-test-id='calendar-default-day-container']")
      ).toHaveLength(1);
    });
  });

  it("should contain length 31 day", () => {
    expect(
      CalendarDefault()
        .at(0)
        .find("[data-test-id='calendar-default-day-container']")
        .find("DayDefault")
        .find({ isCurrentMonth: true })
    ).toHaveLength(31);
  });
});

describe("CalendarSelector", () => {
  let wrapper;

  const CalendarSelector = () => wrapper.find("CalendarSelector");

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(CalendarSelector()).toHaveLength(1);
  });

  it("should contain two select element", () => {
    expect(CalendarSelector().find("select")).toHaveLength(2);
  });
});

describe("CalendarSimple", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const CalendarSimple = () => wrapper.find("CalendarSimple");
  const Title = () => getByDataId(CalendarSimple(), "calendar-title");

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(CalendarSimple()).toHaveLength(1);
  });

  it("should contain title (default)", () => {
    let localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(CalendarSimple().prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(Title().find("time").text()).toBe(localeString);
  });

  it("should contain title (en)", () => {
    wrapper.setProps({ locales: "en" });

    const localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(CalendarSimple().prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(Title().find("time").text()).toBe(localeString);
  });
});

describe("CalendarContainer", () => {
  let wrapper;

  const CalendarContainer = () => wrapper.find("CalendarContainer");

  const props = {
    startDate: new Date(2020, 0, 5),
    endDate: new Date(2020, 0, 6),
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(CalendarContainer()).toHaveLength(1);
  });

  it("should contain style default", () => {
    expect(CalendarContainer().getDOMNode().style.gridTemplateColumns).toBe(
      "repeat(2, 1fr)"
    );
  });
});

describe("TimePicker", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const TimePicker = () => wrapper.find("TimePicker");
  const Start = () => getByDataId(TimePicker(), "time-picker-start");
  const End = () => getByDataId(TimePicker(), "time-picker-end");

  const props = {
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(TimePicker()).toHaveLength(1);
  });

  it("should contain two input type time", () => {
    expect(TimePicker().find('input[type="time"]')).toHaveLength(2);
  });

  it("should be toggle disabled prop startDate", () => {
    expect(Start().prop("disabled")).toBeTruthy();

    wrapper.setProps({ startDate: new Date() });

    wrapper.update();

    expect(Start().prop("disabled")).toBeFalsy();
  });

  it("should be toggle disabled prop endDate", () => {
    expect(End().prop("disabled")).toBeTruthy();

    wrapper.setProps({ endDate: new Date() });

    wrapper.update();

    expect(End().prop("disabled")).toBeFalsy();
  });

  it("should be set value startDate", () => {
    wrapper.setProps({ startDate: new Date(0, 0, 0, 10, 10, 10) });

    wrapper.update();

    expect(Start().prop("value")).toBe("10:10:10");

    wrapper.setProps({ startDate: new Date(0, 0, 0, 20, 10, 10) });

    wrapper.update();

    expect(Start().prop("value")).toBe("20:10:10");
  });

  it("should be set value endDate", () => {
    wrapper.setProps({ endDate: new Date(0, 0, 0, 10, 10, 10) });

    wrapper.update();

    expect(End().prop("value")).toBe("10:10:10");

    wrapper.setProps({ endDate: new Date(0, 0, 0, 20, 10, 10) });

    wrapper.update();

    expect(End().prop("value")).toBe("20:10:10");
  });
});

describe("BottomBar", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const BottomBar = () => wrapper.find("BottomBar");
  const Title = () => getByDataId(BottomBar(), "bottom-bar-title");
  const ApplyButton = () => getByDataId(BottomBar(), "bottom-bar-apply-button");
  const ResetButton = () => getByDataId(BottomBar(), "bottom-bar-clear-button");

  const props = {
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(BottomBar()).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(Title()).toHaveLength(0);
  });

  it("should render with title", () => {
    wrapper.setProps({ startDate: new Date() });
    wrapper.update();
    expect(Title()).toHaveLength(1);
  });

  it("should contain apply button", () => {
    expect(ApplyButton()).toHaveLength(1);
  });

  it("should contain reset button", () => {
    expect(ResetButton()).toHaveLength(1);
  });
});

describe("Control", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Control = () => wrapper.find("Control");
  const LeftButton = () => getByDataId(Control(), 'control-left');
  const RightButton = () => getByDataId(Control(), 'control-right');

  const props = {
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(Control()).toHaveLength(1);
  });

  it("should render left control", () => {
    expect(LeftButton()).toHaveLength(1);
  });

  it("should render right control", () => {
    expect(RightButton()).toHaveLength(1);
  });
});
