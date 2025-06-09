import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns";

const MonthlyAttendanceCalendar = ({ attendanceDates = [], holidayDates = [] }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const attendanceDays = attendanceDates.map((d) => new Date(d));
  const holidayDays = holidayDates.map((d) => new Date(d));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getDayStatus = (date) => {
    if (holidayDays.some((h) => isSameDay(h, date))) return "holiday";
    if (attendanceDays.some((a) => isSameDay(a, date))) return "attended";
    if (date < new Date()) return "absent";
    return "future";
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
        Monthly Attendance - {format(monthStart, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          const status = getDayStatus(date);
          const isCurrentMonth = date.getMonth() === monthStart.getMonth();

          let bgColor = "bg-transparent";
          let textColor = "text-gray-400";

          if (!isCurrentMonth) {
            textColor = "text-gray-300";
          } else {
            switch (status) {
              case "holiday":
                bgColor = "bg-gray-300";
                textColor = "text-gray-700";
                break;
              case "attended":
                bgColor = "bg-green-400";
                textColor = "text-white";
                break;
              case "absent":
                bgColor = "bg-red-400";
                textColor = "text-white";
                break;
              case "future":
                bgColor = "bg-transparent";
                textColor = "text-gray-500";
                break;
              default:
                break;
            }
          }

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-md cursor-default ${bgColor} ${textColor}`}
              title={`${format(date, "eee, MMM d")}`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-around text-sm font-medium">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-green-400 rounded" />
          <span>Attended</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-red-400 rounded" />
          <span>Absent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <span>Holiday</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceCalendar;
