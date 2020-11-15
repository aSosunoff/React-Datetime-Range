import React, { useMemo } from "react";
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

  return (
    <CalendarDefault {...props}>
      <div className={styles.title}>
        <Select
          value={month}
          onChange={changeMonthHandler}
          items={monthNames}
        />

        <Select value={year} onChange={changeYearHandler} items={yearList} />
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
