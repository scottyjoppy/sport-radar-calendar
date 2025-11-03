export function getDateArray(year, month, startMonday) {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const firstDay = firstOfMonth.getDay();

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getDate();
  const daysInPrevMonth = new Date(Date.UTC(year, month, 0)).getDate();

  const dateArray = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dateArray.push(new Date(Date.UTC(year, month - 1, daysInPrevMonth - i)));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dateArray.push(new Date(Date.UTC(year, month, i)));
  }

  if (startMonday && firstDay !== 0) dateArray.shift();

  let i = 1;
  while (dateArray.length < 42) {
    dateArray.push(new Date(Date.UTC(year, month + 1, i)));
    i++;
  }

  return dateArray;
}

export function inputDateFormat(date) {
  const d = date.value;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function dayToUTCDay(day) {
  return new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
}
