import React, { useCallback, useRef, useState } from "react";
import { mount } from "enzyme";

import RangePicker from "./RangePicker";

const App = () => {
  const targetButton = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const toggleRangePicker = useCallback(() => setOpen((isOpen) => !isOpen), []);

  const closeRangePicker = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        data-test-id="open"
        ref={targetButton}
        onClick={toggleRangePicker}
      >
        Открыть
      </button>

      <RangePicker
        isOpen={isOpen}
        target={targetButton.current}
        onClose={closeRangePicker}
      />
    </>
  );
};

describe("RangePicker", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-test-id="${dataId}"]`);
  const getProp = (prop) => component.prop(prop);
  const setProp = (prop, value) => component.setProps({ [prop]: value });

  const getRangePicker = () => getByDataId("range-picker");

  beforeEach(() => {
    component = mount(<App />);
  });

  it("should render", () => {
    expect(getRangePicker()).toHaveLength(1);
  });

  /* it("should contain Control", () => {
    expect(component.find("Control")).toHaveLength(1);
  });

  it("should contain CalendarContainer", () => {
    expect(component.find("CalendarContainer")).toHaveLength(1);
  });

  it("should contain TimePicker", () => {
    expect(component.find("TimePicker")).toHaveLength(1);
  });

  it("should contain BottomBar", () => {
    expect(component.find("BottomBar")).toHaveLength(1);
  }); */
});
