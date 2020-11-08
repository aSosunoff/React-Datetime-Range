import React from "react";
import { mount } from "enzyme";
import { compose } from "../../utils/compose";
import { withContext } from "../../HOC/withContext";
import { ShowDateProvider } from "../../contexts/showDateContext";

jest.mock("../../contexts/showDateContext");

const Control = compose(withContext(ShowDateProvider))(
  require("./Control").default
);

describe("Control", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const LeftButton = () => getByDataId(wrapper, "control-left");
  const RightButton = () => getByDataId(wrapper, "control-right");

  const showDateContext = () => require("../../contexts/showDateContext");
  const requireActual = () =>
    jest.requireActual("../../contexts/showDateContext");

  beforeEach(() => {
    const context = showDateContext();
    const actual = requireActual();

    for (const key in context) {
      if (context[key].mockImplementation)
        context[key].mockImplementation(actual[key]);
    }

    wrapper = mount(<Control />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render left control", () => {
    expect(LeftButton()).toHaveLength(1);
  });

  it("should render right control", () => {
    expect(RightButton()).toHaveLength(1);
  });

  it("should call handler after click left button", () => {
    const prevMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      prevMonthHandler,
    }));

    wrapper = mount(<Control />);

    LeftButton().simulate("click");

    expect(prevMonthHandler).toHaveBeenCalled();
  });

  it("should call handler after click right button", () => {
    const nextMonthHandler = jest.fn();

    showDateContext().useShowDateContext.mockImplementation(() => ({
      ...requireActual().useShowDateContext(),
      nextMonthHandler,
    }));

    wrapper = mount(<Control />);

    RightButton().simulate("click");

    expect(nextMonthHandler).toHaveBeenCalled();
  });
});
