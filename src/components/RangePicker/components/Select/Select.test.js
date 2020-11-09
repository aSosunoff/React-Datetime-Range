import React from "react";
import { mount } from "enzyme";
import Select from "./Select";

describe("Select", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Select items={[{ id: 1, value: "test" }]} onChange={jest.fn()} />
    );
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should contain ArrowBottom element", () => {
    expect(wrapper.find("ArrowBottom")).toHaveLength(1);
  });

  it("should call onChange after select", () => {
    const onChange = jest.fn();

    wrapper.setProps({ onChange });

    wrapper.find("select").simulate("change");

    expect(onChange).toHaveBeenCalled();

    const [[result]] = onChange.mock.calls;

    expect(result).toBe("test");
  });
});
