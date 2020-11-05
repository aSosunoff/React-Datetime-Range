import React from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

describe("RangePicker", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    expect(getByDataId("range-picker")).toHaveLength(1);
  });

  it("should contain Control", () => {
    expect(wrapper.find("Control")).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(wrapper.find("CalendarContainer")).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(wrapper.find("TimePicker")).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(wrapper.find("BottomBar")).toHaveLength(1);
  });

  it("should contain CalendarSelector and CalendarSimple", () => {
    const CalendarContainer = wrapper.find("CalendarContainer");

    const CalendarSelector = CalendarContainer.find("CalendarSelector");

    expect(CalendarSelector).toHaveLength(1);

    const CalendarSimple = CalendarContainer.find("CalendarSimple");

    expect(CalendarSimple).toHaveLength(1);
  });

  it("should raise range after apply", () => {
    const CalendarContainer = wrapper.find("CalendarContainer");

    const CalendarSelector = CalendarContainer.find("CalendarSelector");

    CalendarSelector.find("DayDefault")
      .find({ number: 1, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    CalendarSelector.find("DayDefault")
      .find({ number: 10, isCurrentMonth: true })
      .find("button")
      .simulate("click");

    getByDataId("bottom-bar-apply-button").simulate("click");

    const [[{ startDate, endDate }]] = props.onRangeSelected.mock.calls;

    expect(startDate.getTime()).toBe(new Date(2020, 0, 1).getTime());
    expect(endDate.getTime()).toBe(new Date(2020, 0, 10).getTime());
  });

  it("should set next calendar", () => {
    let titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    wrapper
      .find("Control")
      .find('[data-test-id="control-right"]')
      .simulate("click");

    titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 2, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);
  });

  it("should set prev calendar", () => {
    let titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

    expect(
      new Date(2020, 1, 1).toLocaleString("ru", {
        month: "long",
        year: "numeric",
      })
    ).toBe(titleText);

    wrapper
      .find("Control")
      .find('[data-test-id="control-left"]')
      .simulate("click");

    titleText = wrapper
      .find("CalendarContainer")
      .find("CalendarSimple")
      .find('[data-test-id="calendar-title"]')
      .text();

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

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    wrapper
      .find("CalendarContainer")
      .children()
      .children()
      .forEach((calendar) => {
        expect(calendar.find("CalendarDefault")).toHaveLength(1);
      });
  });

  it("should contain WeekLine", () => {
    wrapper.find("CalendarDefault").forEach((calendar) => {
      expect(calendar.find("WeekLine")).toHaveLength(1);
    });
  });

  it("should contain day container", () => {
    wrapper.find("CalendarDefault").forEach((calendar) => {
      expect(
        calendar.find("[data-test-id='calendar-default-day-container']")
      ).toHaveLength(1);
    });
  });

  it("should contain length 31 day", () => {
    expect(
      wrapper
        .find("CalendarDefault")
        .at(0)
        .find("[data-test-id='calendar-default-day-container']")
        .find("DayDefault")
        .find({ isCurrentMonth: true })
    ).toHaveLength(31);
  });
});

describe("CalendarSelector", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    expect(wrapper.find("CalendarSelector")).toHaveLength(1);
  });

  it("should contain two select element", () => {
    expect(wrapper.find("CalendarSelector").find("select")).toHaveLength(2);
  });
});

describe("CalendarSimple", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    expect(wrapper.find("CalendarSimple")).toHaveLength(1);
  });

  it("should contain title (default)", () => {
    let localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(wrapper.find("CalendarSimple").prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(getByDataId("calendar-title").find("time").text()).toBe(
      localeString
    );
  });

  it("should contain title (en)", () => {
    wrapper.setProps({ locales: "en" });

    const localeString = new Date(
      props.startDate.getFullYear(),
      props.startDate.getMonth() + 1
    ).toLocaleString(wrapper.find("CalendarSimple").prop("locales"), {
      month: "long",
      year: "numeric",
    });

    expect(getByDataId("calendar-title").find("time").text()).toBe(
      localeString
    );
  });
});

describe("CalendarContainer", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

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
    expect(wrapper.find("CalendarContainer")).toHaveLength(1);
  });

  it("should contain style default", () => {
    expect(
      wrapper.find("CalendarContainer").getDOMNode().style.gridTemplateColumns
    ).toBe("repeat(2, 1fr)");
  });
});

describe("TimePicker", () => {
  let wrapper;

  const getByDataId = (dataId) => wrapper.find(`[data-test-id="${dataId}"]`);

  const props = {
    onRangeSelected: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<RangePicker {...props} />);
  });

  it("should render", () => {
    expect(wrapper.find("TimePicker")).toHaveLength(1);
  });

  it("should contain two input type time", () => {
    expect(wrapper.find("TimePicker").find('input[type="time"]')).toHaveLength(
      2
    );
  });

  it("should be toggle disabled prop startDate", () => {
    expect(
      wrapper.find("TimePicker input[type='time']").at(0).prop("disabled")
    ).toBeTruthy();

    wrapper.setProps({ startDate: new Date() });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(0).prop("disabled")
    ).toBeFalsy();
  });

  it("should be toggle disabled prop endDate", () => {
    expect(
      wrapper.find("TimePicker input[type='time']").at(1).prop("disabled")
    ).toBeTruthy();

    wrapper.setProps({ endDate: new Date() });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(1).prop("disabled")
    ).toBeFalsy();
  });

  it("should be set value startDate", () => {
    wrapper.setProps({ startDate: new Date(0, 0, 0, 10, 10, 10) });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(0).prop("value")
    ).toBe("10:10:10");

    wrapper.setProps({ startDate: new Date(0, 0, 0, 20, 10, 10) });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(0).prop("value")
    ).toBe("20:10:10");
  });

  it("should be set value endDate", () => {
    wrapper.setProps({ endDate: new Date(0, 0, 0, 10, 10, 10) });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(1).prop("value")
    ).toBe("10:10:10");

    wrapper.setProps({ endDate: new Date(0, 0, 0, 20, 10, 10) });

    wrapper.update();

    expect(
      wrapper.find("TimePicker input[type='time']").at(1).prop("value")
    ).toBe("20:10:10");
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
