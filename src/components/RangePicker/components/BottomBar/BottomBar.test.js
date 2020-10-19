import React from "react";
import { mount } from "enzyme";

import BottomBar from "./BottomBar";

describe("BottomBar", () => {
  let component;

  const getByDataId = (dataId) => component.find(`[data-id="${dataId}"]`);
  const getTitle = () => getByDataId("bottom-bar-title");

  beforeEach(() => {
    component = mount(<BottomBar />);
  });

  it("should render", () => {
    expect(component).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(getTitle()).toHaveLength(0);
  });

  it("should render with title", () => {
    component = mount(<BottomBar title="test" />);
    expect(getTitle()).toHaveLength(1);
  });

  it("allows us to set props of title", () => {
    component = mount(<BottomBar title="baz" />);
    expect(component.props().title).toBe("baz");
    expect(getTitle().text()).toBe("baz");

    component = mount(<BottomBar title="foo" />);
    expect(component.props().title).toBe("foo");
    expect(getTitle().text()).toBe("foo");
  });

  it("should render with children", () => {
    component = mount(
      <BottomBar>
        <div date-child="child">1</div>
        <div date-child="child">2</div>
      </BottomBar>
    );

    expect(component.find('[date-child="child"]')).toHaveLength(2);
  });
});
