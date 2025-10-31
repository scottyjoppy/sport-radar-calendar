export function getDateArray(year, month, startMonday) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dateArray = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dateArray.push(new Date(year, month - 1, daysInPrevMonth - i));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dateArray.push(new Date(year, month, i));
  }

  if (startMonday && firstDay !== 0) dateArray.shift();

  let i = 1;
  while (dateArray.length < 42) {
    dateArray.push(new Date(year, month + 1, i));
    i++;
  }

  return dateArray;
}
