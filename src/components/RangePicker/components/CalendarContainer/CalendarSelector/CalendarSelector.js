import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getMonthNames, getYearList } from "../../../utils/dateHalper";
import CalendarDefault from "../CalendarDefault";
import styles from "./CalendarSelector.module.scss";
import useDateSplit from "../../../hooks/useDateSplit";
import Select from "../../Select/";

const CalendarSelector = ({
  changeMonthHandler,
  changeYearHandler,
  date,
  ...props
}) => {
  const { year, month } = useDateSplit(date);

  const yearList = useMemo(
    () => getYearList().map((year) => ({ id: year, value: year })),
    []
  );

  const monthNames = useMemo(
    () =>
      getMonthNames(props.locales).map((name, index) => ({
        id: index,
        value: index,
        text: name,
      })),
    [props.locales]
  );

  const changeMonthHandlerLocal = useCallback(
    ({ target: { options } }) =>
      changeMonthHandler(options[options.selectedIndex].value),
    [changeMonthHandler]
  );

  const changeYearHandlerLocal = useCallback(
    ({ target: { options } }) =>
      changeYearHandler(options[options.selectedIndex].value),
    [changeYearHandler]
  );

  return (
    <CalendarDefault {...props}>
      <div className={styles.title}>
        <Select
          value={month}
          onChange={changeMonthHandlerLocal}
          items={monthNames}
        />

        <Select
          value={year}
          onChange={changeYearHandlerLocal}
          items={yearList}
        />
      </div>
    </CalendarDefault>
  );
};

CalendarSelector.defaultProps = {};

CalendarSelector.propTypes = {
  changeMonthHandler: PropTypes.func.isRequired,
  changeYearHandler: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarSelector;
