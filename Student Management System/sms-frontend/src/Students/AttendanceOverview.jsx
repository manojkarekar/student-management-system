import React from "react";

// Static monthly attendance data
const monthlyAttendance = {
    "2025-06-01": "present",
    "2025-06-02": "present",
    "2025-06-03": "absent",
    "2025-06-04": "holiday",
    "2025-06-05": "present",
    "2025-06-06": "present",
    "2025-06-07": "absent",
    "2025-06-08": "present",
};

// Static weekly attendance data
const weeklyData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 2.5 },
    { day: "Thu", hours: 1 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 2 },
    { day: "Sun", hours: 2.5 },
];

const AttendanceOverview = () => {
    const year = 2025;
    const month = 5; // June

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayWeekday = new Date(year, month, 1).getDay();
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const statusColor = (status) => {
        switch (status) {
            case "present":
                return "bg-green-400";
            case "absent":
                return "bg-red-400";
            case "holiday":
                return "bg-gray-400";
            default:
                return "bg-gray-200";
        }
    };

    const maxHours = Math.max(...weeklyData.map((d) => d.hours)) || 1;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto">
            {/* Weekly Chart */}
            <div className="flex-1 bg-white rounded-2xl p-4 md:p-6 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700 text-center">
                    Weekly Attendance
                </h2>
                <div className="flex justify-between items-end h-60 sm:h-72 space-x-2 sm:space-x-4">
                    {weeklyData.map(({ day, hours }) => {
                        // Adjust height scaling to be more visible
                        const heightPercent = (hours / maxHours) * 60 + 40;

                        return (
                            <div key={day} className="flex flex-col items-center flex-1">
                                <div
                                    className="bg-blue-600 w-5 sm:w-6 md:w-8 rounded-t-md transition-all duration-500 min-h-[30px] flex-grow"
                                    style={{ height: `${heightPercent}%` }}
                                    title={`${hours} hours attended`}
                                />
                                <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-700">
                                    {day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Monthly Calendar */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700 text-center">
                    Monthly Attendance - June 2025
                </h2>

                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-sm">
                    {weekdays.map((wd) => (
                        <div
                            key={wd}
                            className="font-semibold text-gray-600 border-b border-gray-300 py-1"
                        >
                            {wd}
                        </div>
                    ))}

                    {/* Fill blank days before 1st */}
                    {[...Array(firstDayWeekday === 0 ? 6 : firstDayWeekday - 1)].map(
                        (_, i) => <div key={`blank-${i}`} className="p-2 sm:p-3" />
                    )}

                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${(month + 1)
                            .toString()
                            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                        const status = monthlyAttendance[dateStr] || "unknown";

                        return (
                            <div
                                key={dateStr}
                                className={`p-2 sm:p-3 rounded-md cursor-default border text-[10px] sm:text-sm ${status === "unknown"
                                        ? "border-gray-200 bg-gray-100"
                                        : "border-transparent"
                                    } ${statusColor(status)} flex flex-col justify-center items-center`}
                                title={`${dateStr} - ${status}`}
                            >
                                <span className="font-semibold">{day}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-green-400 rounded" />
                        <span>Present</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-red-400 rounded" />
                        <span>Absent</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gray-400 rounded" />
                        <span>Holiday</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gray-200 rounded border border-gray-300" />
                        <span>Unknown</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceOverview;
