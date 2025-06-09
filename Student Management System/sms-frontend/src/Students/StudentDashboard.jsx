import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import StudentInfo from "./StudentInfo";
import IDCardPreview from "./IDCardPreview";
import AttendanceOverview from "./AttendanceOverview";

const student = {
  name: "Darshan Vichare",
  course: "Full Stack Development",
  trainer: "Anjali Sharma",
  batchTime: "9:00 AM - 11:00 AM",
  photo: "/student-photo.jpg",
  qrCodeUrl: "/student-qr.png",
  id: "SMS2025001",
  courseModules: [
    { name: "HTML & CSS", completed: true },
    { name: "JavaScript Basics", completed: true },
    { name: "ReactJS", completed: false },
    { name: "Django Backend", completed: false },
    { name: "Database Design", completed: false },
  ],
  hrMockStatus: "Completed",
  technicalMockStatus: "Pending",
};


// Example attendance & holiday dates (yyyy-mm-dd)


const completedCount = student.courseModules.filter((m) => m.completed).length;
const totalModules = student.courseModules.length;
const overallProgress = Math.round((completedCount / totalModules) * 100);

const progressData = [
  { name: "Completed", value: overallProgress },
  { name: "Remaining", value: 100 - overallProgress },
];

const COLORS = ["#2563eb", "#e0e7ff"];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Welcome to Your Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StudentInfo student={student} />
        <IDCardPreview student={student} />

        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Overall Progress</h2>
          <div style={{ width: 150, height: 150, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={10}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#2563eb",
              }}
            >
              {overallProgress}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Course Modules</h2>
        <ul className="space-y-3">
          {student.courseModules.map((module, idx) => (
            <li
              key={idx}
              className={`flex justify-between items-center p-3 rounded-md border ${
                module.completed
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <span className="font-medium">{module.name}</span>
              <span
                className={`text-sm font-semibold ${
                  module.completed ? "text-green-700" : "text-gray-500"
                }`}
              >
                {module.completed ? "Complete" : "Incomplete"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">HR Mock Interview Status</h2>
          <p
            className={`text-lg font-semibold ${
              student.hrMockStatus === "Completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {student.hrMockStatus}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Technical Mock Interview Status
          </h2>
          <p
            className={`text-lg font-semibold ${
              student.technicalMockStatus === "Completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {student.technicalMockStatus}
          </p>
        </div>
      </div>

     
      <AttendanceOverview/>
      
    </div>
  );
};

export default StudentDashboard;
