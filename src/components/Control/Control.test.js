import React from "react";
import { mount } from "enzyme";
import Control from "./Control";

jest.mock("../../contexts/showDateContext");

describe("Control", () => {
  let wrapper;

  const showDateContext = () => require("../../contexts/showDateContext");
  const requireActual = () =>
    jest.requireActual("../../contexts/showDateContext");

  beforeEach(() => {
    showDateContext().useShowDateContext.mockImplementation(() => ({
      nextMonthHandler: () => {},
      prevMonthHandler: () => {},
    }));

    wrapper = mount(<Control />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should call handler after click left button", () => {
    const prevMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      prevMonthHandler,
    }));

    wrapper = mount(<Control />);

    wrapper.find("ArrowLeft").simulate("click");

    expect(prevMonthHandler).toHaveBeenCalled();
  });

  it("should call handler after click right button", () => {
    const nextMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      nextMonthHandler,
    }));

    wrapper = mount(<Control />);

    wrapper.find("ArrowRight").simulate("click");

    expect(nextMonthHandler).toHaveBeenCalled();
  });
});
