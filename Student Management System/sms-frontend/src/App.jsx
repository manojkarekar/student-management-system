  import React from "react";
  import { Routes, Route, Navigate } from "react-router-dom";

  // HR Dashboard Imports
  import Sidebar from "./HR_dashboard/components/Sidebar";
  import Dashboard from "./HR_dashboard/components/Dashboard";
  import Students from "./HR_dashboard/components/Students";
  import StudentDetails from "./HR_dashboard/components/StudentDetails";
  import Batches from "./HR_dashboard/components/Batches";
  import Trainers from "./HR_dashboard/components/Trainers";
  import TrainerDetails from "./HR_dashboard/components/TrainersDetails";
  import ChangeRequestForm from "./HR_dashboard/components/request";


  // Student Pages
  import StudentDashboard from "./Students/StudentDashboard";
  import StudentLogin from "./Students/StudentLogin";
  import StudentRegister from "./Students/StudentRegister";
import { StudentHome } from "./Students/StudentHome";



  export default function App() {
    return (
      <Routes>
        {/* Redirect base route '/' to '/student/dashboard' */}
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/home" element={<StudentHome />} />

        {/* HR Dashboard Routes */}
        <Route
          path="/hr/*"
          element={
            <div className="flex bg-gray-100 min-h-screen">
              <Sidebar />
              <main className="flex-grow p-6 lg:ml-64 w-full">
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="students" element={<Students />} />
                  <Route path="student/:id" element={<StudentDetails />} />
                  <Route path="batches" element={<Batches />} />
                  <Route path="trainers" element={<Trainers />} />
                  <Route path="trainer/:id" element={<TrainerDetails />} />
                  <Route path="request" element={<ChangeRequestForm />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    );
  }
