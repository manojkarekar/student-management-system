import React from "react";
import { Routes, Route } from "react-router-dom";
import Students from "./HR_dashboard/components/Students";
import Batches from "./HR_dashboard/components/Batches";
import Dashboard from "./HR_dashboard/components/Dashboard";
import Trainers from "./HR_dashboard/components/Trainers";
import Sidebar from "./HR_dashboard/components/Sidebar";
import StudentDetails from "./HR_dashboard/components/StudentDetails";
import TrainerDetails from "./HR_dashboard/components/TrainersDetails";
import ChangeRequestForm from "./HR_dashboard/components/request";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (fixed width and fixed position) */}
      <Sidebar />

      {/* Main content area with left margin on large screens to clear sidebar */}
      <main className="flex-grow p-6 lg:ml-64 w-full">
        <Routes>
          {/* HR Dashboard Routes */}
          <Route path="/" />
          <Route path="/hr" element={<Dashboard />} />
          <Route path="/hr/students" element={<Students />} />
          <Route path="/hr/student/:id" element={<StudentDetails />} />
          <Route path="/hr/batches" element={<Batches />} />
          <Route path="/hr/trainers" element={<Trainers />} />
          <Route path="/hr/trainer/:id" element={<TrainerDetails />} />
          <Route path="/hr/request" element={<ChangeRequestForm />} />

          {/* You can add Trainer Dashboard routes here if needed */}
        </Routes>
      </main>
    </div>
  );
}
