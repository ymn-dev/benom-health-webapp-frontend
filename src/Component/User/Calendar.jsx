import React, { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) - 6 (Saturday)

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || day > daysInMonth) {
          week.push(<td key={`empty-${j}`}></td>);
        } else {
          week.push(<td key={day}>{day}</td>);
          day++;
        }
      }

      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4 mt-4">
    <div className="calendar border border-slate-300 rounded-3xl pb-2">
      <div className="header bg-slate-700 text-white pt-4 pb-1 pl-1 rounded-t-3xl">
      <h2 className="text-3xl">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <button onClick={handlePrevMonth} className="mr-20 pr-5">Previous Month</button>
      <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="px-1 pr-4">Sun</th>
            <th className="px-1">Mon</th>
            <th className="px-2">Tue</th>
            <th className="px-1">Wed</th>
            <th className="px-2">Thu</th>
            <th className="px-3">Fri</th>
            <th className="px-1 pl-4">Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
    </div>
  );
}

export default Calendar;