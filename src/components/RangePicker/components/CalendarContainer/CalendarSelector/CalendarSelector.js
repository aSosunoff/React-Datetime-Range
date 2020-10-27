import React, { useCallback, useMemo } from "react";
import { getMonthNames, getYearList } from "../../../utils/dateHalper";
import CalendarDefault from "../CalendarDefault";
import styles from "./CalendarSelector.module.scss";
import cn from "classnames";

const CalendarSelector = ({ setYearHandler, setMonthHandler, ...props }) => {
  const month = useMemo(() => props.date.getMonth(), [props.date]);

  const year = useMemo(() => props.date.getFullYear(), [props.date]);

  const yearList = useMemo(() => getYearList(), []);

  const monthNames = useMemo(() => getMonthNames(props.locales), [
    props.locales,
  ]);

  const changeMonthHandler = useCallback(
    ({ target }) => {
      const selected = target.options[target.options.selectedIndex];
      setMonthHandler(selected.value);
    },
    [setMonthHandler]
  );

  const changeYearHandler = useCallback(
    ({ target }) => {
      const selected = target.options[target.options.selectedIndex];
      setYearHandler(selected.value);
    },
    [setYearHandler]
  );

  const TitleComponentRender = useCallback(
    ({ titleClass }) => (
      <div className={cn(titleClass, styles.title)}>
        <select value={month} onChange={changeMonthHandler}>
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>

        <select value={year} onChange={changeYearHandler}>
          {yearList.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    ),
    [changeMonthHandler, changeYearHandler, month, monthNames, year, yearList]
  );

  return (
    <CalendarDefault {...props} TitleComponentRender={TitleComponentRender} />
  );
};

/* CalendarSelector.defaultProps = {
  locales: "ru",
};

CalendarSelector.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
  locales: PropTypes.string,
}; */

export default CalendarSelector;
