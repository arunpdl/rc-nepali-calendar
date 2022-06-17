import { useState } from "react";
import * as calF from "../functions/calendarFunctions";
import MonthView from "./MonthView";
import YearMonthSwitch from "./YearMonthSwitch";

interface BsParams {
  bsDate: number;
  bsMonth: number;
  bsYear: number;
}

export interface CalendarProps {
  defaultDate?: Date;
  onChange?: (date: Date, { bsDate, bsMonth, bsYear }: BsParams) => void;
  className?: string;
}

export interface CalendarStates {
  activeDate: Date;
  activeBsDate: { bsYear: number; bsMonth: number; bsDate: number };
}

const Calendar = ({ defaultDate, className, onChange }: CalendarProps) => {
  const date = defaultDate || new Date();
  const [activeDate, setActiveDate] = useState(date);
  const [activeBsDate, setActiveBsDate] = useState(
    calF.convertADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate())
  );

  const switchViewsYearMonth = (year, month) => {
    setActiveBsDate({
      bsYear: year,
      bsMonth: month,
      bsDate: activeBsDate.bsDate,
    });
  };

  return (
    <div className={`${className || ""}`}>
      <YearMonthSwitch
        defaultMonth={activeBsDate.bsMonth}
        defaultYear={activeBsDate.bsYear}
        onSwitch={(year, month) => switchViewsYearMonth(year, month)}
      />
      <MonthView
        viewBsYear={activeBsDate.bsYear}
        viewBsMonth={activeBsDate.bsMonth}
        defaultActiveDate={activeDate}
        onDayClicked={(date, { bsDate, bsMonth, bsYear }) => {
          onChange && onChange(date, { bsDate, bsMonth, bsYear });
        }}
      />
    </div>
  );
};

export default Calendar;
