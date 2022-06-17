import calendarData from "../functions/calendarData";
import { useStyles } from "./styles";
import * as calFns from "../functions/calendarFunctions";
import { useState } from "react";

interface BsParams {
  bsDate: number;
  bsMonth: number;
  bsYear: number;
}

interface MonthViewProps {
  onDayClicked: (date: Date, { bsDate, bsMonth, bsYear }: BsParams) => void;
  viewBsYear: number;
  viewBsMonth: number;
  defaultActiveDate: Date;
  customClasses?: any;
}

interface MonthViewState {
  selectedDate: Date;
}

const MonthView = ({
  defaultActiveDate,
  viewBsMonth,
  viewBsYear,
  onDayClicked,
  customClasses,
}: MonthViewProps) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(
    defaultActiveDate || new Date()
  );

  const getDayInfo = (date: Date) => {
    const bsDate = calFns.convertADtoBS(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    return { adDate: new Date(date), ...bsDate };
  };

  const getDays = () => {
    let startDay: Date, lastDay: Date;
    startDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, 1);
    startDay.setDate(startDay.getDate() - startDay.getDay()); // Sunday, the first day in the view
    lastDay = calFns.convertBStoAD(
      viewBsYear,
      viewBsMonth,
      calFns.getBsMonthDays(viewBsYear, viewBsMonth)
    );
    lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Saturday, the last day in the view
    const days = [];
    while (startDay <= lastDay) {
      days.push(getDayInfo(startDay));
      startDay.setDate(startDay.getDate() + 1);
    }
    return days;
  };

  const isSameDate = (adDate: Date, toMatch: Date = new Date()) => {
    return (
      adDate.getDate() == toMatch.getDate() &&
      adDate.getMonth() == toMatch.getMonth() &&
      adDate.getFullYear() == toMatch.getFullYear()
    );
  };

  const onDaySelect = (adDate: Date, { bsDate, bsMonth, bsYear }) => {
    setSelectedDate(adDate);
    onDayClicked(adDate, { bsDate, bsMonth, bsYear });
  };

  return (
    <div className={`r-n-cal-month-view ${classes.calendar}`}>
      <div className={`r-n-cal-weekdays ${classes.weekdays}`}>
        {calendarData.bsDays.map((day) => (
          <div key={day} className={classes.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={`r-n-cal-days ${classes.days}`}>
        {getDays().map(({ adDate, bsDate, bsMonth, bsYear }, i) => (
          <div
            className={`r-n-cal-day 
                  ${i % 7 == 6 ? classes.weekend : ""}
                  ${classes.day} ${
              bsMonth !== viewBsMonth ? classes.dayMuted : ""
            } 
                  ${isSameDate(adDate) ? classes.today : ""} 
                  ${
                    isSameDate(adDate, selectedDate) ? classes.selectedDay : ""
                  } 
                  `}
            key={`${bsDate} ${bsMonth}`}
            onClick={() => onDaySelect(adDate, { bsDate, bsMonth, bsYear })}
          >
            {calFns.toDevanagariDigits(bsDate)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
