import React from "react";
import { mount } from "enzyme";
import ArrowDefault from "./ArrowDefault";

describe("ArrowDefault", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ArrowDefault />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should call onClick", () => {
    const onClick = jest.fn();
    wrapper.setProps({ onClick });
    wrapper.find("div").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("should contain class", () => {
    const className = "test_class";

    wrapper.setProps({ className });

    expect(wrapper.find("div").prop("className")).toEqual(
      expect.stringContaining(className)
    );
  });

  it("should contain style", () => {
    const style = { top: "1px" };

    wrapper.setProps({ style });

    expect(wrapper.find("div").prop("style")).toEqual(style);
  });
});
