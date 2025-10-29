export function getDate() {
  return new Date();
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/* 
REMINDER: JS Date Obj
- Year = base 0
- Month = base 0
- Number Day = base 1?
- Name Day = base 0
*/

export function getFirstDayCurrMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getDayArray(year, month, offset = 0) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay() - offset;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayArray = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dayArray.push(daysInPrevMonth - i);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dayArray.push(i);
  }

  while (dayArray.length < 35) {
    dayArray.push(dayArray.length - daysInMonth - (firstDay - 1 + offset) + 1);
  }

  return dayArray;
}
