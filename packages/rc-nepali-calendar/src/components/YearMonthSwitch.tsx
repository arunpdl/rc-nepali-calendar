import { useState } from "react";
import calendarData from "../functions/calendarData";
import * as calFns from "../functions/calendarFunctions";
import { useStyles } from "./styles";

enum Switch {
  month,
  year,
}

export interface YearMonthSwitchProps {
  onSwitch: (year: number, month: number) => void;
  defaultYear: number;
  defaultMonth: number;
  classes: any;
}

export interface YearMonthSwitchState {
  currentYear: number;
  currentMonth: number;
  activeSwitch: Switch;
}

const YearMonthSwitch = ({ defaultYear, defaultMonth, onSwitch }) => {
  const classes = useStyles();

  const [currentYear, setCurrentYear] = useState(defaultYear);
  const [currentMonth, setCurrentMonth] = useState(defaultMonth);
  const [activeSwitch, setActiveSwitch] = useState(Switch.month);

  const setCurrent = (currYear, currMonth) => {
    setCurrentYear(currYear);
    setCurrentMonth(currMonth);
    onSwitch(currYear, currMonth);
  };

  const goBack = () => {
    if (activeSwitch === Switch.year && calendarData.minBsYear < currentYear) {
      setCurrent(currentYear - 1, currentMonth);
    }
    if (activeSwitch === Switch.month) {
      let currMonth = currentMonth - 1;
      let currYear = currentYear;

      if (currMonth === 0) {
        currMonth = 12;
        currYear = currYear - 1;
      }
      if (calendarData.minBsYear <= currYear) {
        setCurrent(currYear, currMonth);
      }
    }
  };

  const goForward = () => {
    if (activeSwitch === Switch.year && calendarData.maxBsYear > currentYear) {
      setCurrent(currentYear + 1, currentMonth);
    }
    if (activeSwitch === Switch.month) {
      let currMonth = currentMonth + 1;
      let currYear = currentYear;
      if (currMonth > 12) {
        currMonth = 1;
        currYear = currYear + 1;
      }
      if (calendarData.maxBsYear >= currYear) {
        setCurrent(currYear, currMonth);
      }
    }
  };

  return (
    <div className={`r-n-cal-switch ${classes.switch}`}>
      <div
        className={`r-n-cal-backBtn ${classes.btns} ${classes.backBtn}`}
        onClick={() => goBack()}
      >
        {"<"}
      </div>
      <div
        className={`r-n-cal-yearBtn ${classes.btns} ${classes.btns} ${
          activeSwitch == Switch.year ? classes.activeSwitch : ""
        }`}
        onClick={() => setActiveSwitch(Switch.year)}
      >
        {calFns.toDevanagariDigits(currentYear)}
      </div>
      <div
        className={`r-n-cal-monthBtn ${classes.btns} ${classes.btns}  ${
          activeSwitch == Switch.month ? classes.activeSwitch : ""
        }`}
        onClick={() => setActiveSwitch(Switch.month)}
      >
        {calendarData.bsMonths[currentMonth - 1]}
      </div>
      <div
        className={`r-n-cal-forwardBtn ${classes.btns} ${classes.forwardBtn}`}
        onClick={() => goForward()}
      >
        {">"}
      </div>
    </div>
  );
};

export default YearMonthSwitch;
