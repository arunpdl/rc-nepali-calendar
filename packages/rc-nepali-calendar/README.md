# Rc Nepali Calendar

This is a simple Nepali Bikram Sambat calendar. This is a fork of [react-nepali-calendar](https://github.com/getaasciesh/React-Nepali-Calendar) as it is no longer maintained and does not work with latest version of React.

## Installation

```yarn add rc-nepali-calendar```

or

```npm install rc-nepali-calendar```

## Usage

```
import React from 'react';
import Calendar from 'rc-nepali-calendar';

const NepaliCalendar = () => (
  <Calendar onChange={(ad,bs) => console.log({ad,bs})} />
);

export default NepaliCalendar;
```

## Props for Calendar component
* defaultDate?: Date //optional. default selected date on calendar. applied only once at component mount
* onChange?: (date: Date, {bsDate, bsMonth, bsYear}) => void; // optional. fired when a date is selected in the calendar.
* className?: string // className for the wrapper div

### Calendar Methods
#### convert AD To BS: CalendarFunctions.convertADtoBS(adYear, adMonth: 1..12, adDate) 
```
import { CalendarFunctions } from 'rc-nepali-calendar';

const bsDate = CalendarFunctions.convertADtoBS(2018, 9, 10);
// bsDate == { "bsDate": 25, "bsMonth": 5, "bsYear": 2075 }
```

#### convert BS to AD
```
import { CalendarFunctions } from 'rc-nepali-calendar';

const adDate = CalendarFunctions.convertBStoAD(2076, 2, 29);
// adDate == new Date(2019, 5, 12)
```





