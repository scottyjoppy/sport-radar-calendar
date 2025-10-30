export function getDateArray(year, month, startMonday) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayArray = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dayArray.push(daysInPrevMonth - i);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dayArray.push(i);
  }

  if (startMonday && firstDay !== 0) dayArray.shift();

  let i = 1;
  while (dayArray.length < 42) {
    dayArray.push(i);
    i++;
  }

  return dayArray;
}
