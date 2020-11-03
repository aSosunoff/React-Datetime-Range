import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { getMonthNames, getYearList } from "../../../utils/dateHalper";
import CalendarDefault from "../CalendarDefault";
import styles from "./CalendarSelector.module.scss";
import cn from "classnames";
import useDateSplit from "../../../hooks/useDateSplit";

const CalendarSelector = ({
  changeMonthHandler,
  changeYearHandler,
  date,
  ...props
}) => {
  const { year, month } = useDateSplit(date);

  const yearList = useMemo(() => getYearList(), []);

  const monthNames = useMemo(() => getMonthNames(props.locales), [
    props.locales,
  ]);

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

  const Title = useCallback(
    ({ titleClass }) => (
      <div className={cn(titleClass, styles.title)}>
        <select value={month} onChange={changeMonthHandlerLocal}>
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>

        <select value={year} onChange={changeYearHandlerLocal}>
          {yearList.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    ),
    [
      changeMonthHandlerLocal,
      changeYearHandlerLocal,
      month,
      monthNames,
      year,
      yearList,
    ]
  );

  return <CalendarDefault {...props}>{Title}</CalendarDefault>;
};

CalendarSelector.defaultProps = {};

CalendarSelector.propTypes = {
  changeMonthHandler: PropTypes.func.isRequired,
  changeYearHandler: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarSelector;
