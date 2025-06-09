import React from "react";
import { Routes, Route } from "react-router-dom";
import { Students } from "./HR_dashboard/components/Students";
import { Batches } from "./HR_dashboard/components/Batches";
import { Dashboard } from "./HR_dashboard/components/Dashboard";
import { Trainers } from "./HR_dashboard/components/Trainers";
import { Sidebar } from "./HR_dashboard/components/Sidebar";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar handles desktop + mobile internally */}

      {/* Main content area */}
      <main className="flex-grow p-6 lg:ml-64">
        <Routes>
          {/* HR Dashboard */}
          <Route
            path="/hr/*"
            element={
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-grow p-6 lg:ml-64">
                  <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="students" element={<Students />} />
                    <Route path="batches" element={<Batches />} />
                    <Route path="trainers" element={<Trainers />} />
                  </Routes>
                </main>
              </div>
            }
          />

          {/* Trainer Dashboard */}
        </Routes>
      </main>
    </div>
  );
}
