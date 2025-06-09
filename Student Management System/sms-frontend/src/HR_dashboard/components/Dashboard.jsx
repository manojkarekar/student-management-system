import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

const COLORS = ['#10B981', '#EF4444', '#9CA3AF'] // pass, fail, not marked

// Sample data with trainers having batches and students
const trainersData = [
  {
    id: 't1',
    name: 'John Doe',
    batches: [
      {
        id: 'b1',
        name: 'Batch Alpha',
        students: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', progress: 97, hrRound: 'pass', techRound: 'fail' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', progress: 98, hrRound: 'pass', techRound: 'pass' },
        ],
      },
      {
        id: 'b2',
        name: 'Batch Beta',
        students: [
          { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', progress: 96, hrRound: 'fail', techRound: null },
          { id: 4, name: 'Diana King', email: 'diana@example.com', progress: 94, hrRound: null, techRound: null },
        ],
      },
    ],
  },
  {
    id: 't2',
    name: 'Jane Smith',
    batches: [
      {
        id: 'b3',
        name: 'Batch Gamma',
        students: [
          { id: 5, name: 'Eve Martin', email: 'eve@example.com', progress: 99, hrRound: 'pass', techRound: 'pass' },
          { id: 6, name: 'Frank Yang', email: 'frank@example.com', progress: 92, hrRound: null, techRound: null },
        ],
      },
      {
        id: 'b4',
        name: 'B        atch Alpha',
        students: [
          { id: 5, name: 'Eve Martin', email: 'eve@example.com', progress: 99, hrRound: 'pass', techRound: 'pass' },
          { id: 6, name: 'Frank Yang', email: 'frank@example.com', progress: 92, hrRound: null, techRound: null },
        ],
      },
    ],
  },
]

// Utility: get all students with progress > 95 (for summary charts)
function getAllStudents(trainers) {
  return trainers.flatMap((t) =>
    t.batches.flatMap((b) => b.students.filter((s) => s.progress > 95))
  )
}

function getRoundStats(students, round) {
  let passCount = 0,
    failCount = 0,
    notMarkedCount = 0

  students.forEach((s) => {
    if (s.progress > 95) {
      if (s[round] === 'pass') passCount++
      else if (s[round] === 'fail') failCount++
      else notMarkedCount++
    }
  })

  return [
    { name: 'Pass', value: passCount },
    { name: 'Fail', value: failCount },
    { name: 'Not Marked', value: notMarkedCount },
  ]
}

export default function Dashboard() {
  const [selectedTrainerId, setSelectedTrainerId] = useState(null)
  const [selectedBatchId, setSelectedBatchId] = useState(null)

  const selectedTrainer = trainersData.find((t) => t.id === selectedTrainerId)
  const selectedBatch = selectedTrainer?.batches.find((b) => b.id === selectedBatchId)

  // If batch selected, use its students, else use all students > 95%
  const studentsToShow = selectedBatch
    ? selectedBatch.students.filter((s) => s.progress > 95)
    : getAllStudents(trainersData)

  // Charts data based on studentsToShow
  const hrRoundData = getRoundStats(studentsToShow, 'hrRound')
  const techRoundData = getRoundStats(studentsToShow, 'techRound')

  // Bar chart: students count per batch (only for selected trainer, else all batches)
  let batchData = []
  if (selectedTrainer) {
    batchData = selectedTrainer.batches.map((batch) => ({
      batch: batch.name,
      count: batch.students.filter((s) => s.progress > 95).length,
    }))
  } else {
    // All batches across trainers
    const batchCountMap = {}
    trainersData.forEach((trainer) =>
      trainer.batches.forEach((batch) => {
        const count = batch.students.filter((s) => s.progress > 95).length
        batchCountMap[batch.name] = count
      })
    )
    batchData = Object.entries(batchCountMap).map(([batch, count]) => ({ batch, count }))
  }

  // Dummy markRound function (you can implement real update logic)
  const markRound = (studentId, round, result) => {
    alert(`Marking student ${studentId} ${round} round as ${result}`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Students with Progress &gt; 95%</h3>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{studentsToShow.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Passed HR Round</h3>
          <p className="mt-2 text-3xl font-extrabold text-green-600">
            {hrRoundData.find((d) => d.name === 'Pass')?.value || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Passed Technical Round</h3>
          <p className="mt-2 text-3xl font-extrabold text-green-600">
            {techRoundData.find((d) => d.name === 'Pass')?.value || 0}
          </p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Students Count per Batch {selectedTrainer ? `(Trainer: ${selectedTrainer.name})` : '(All Batches)'}
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={batchData}
                margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
              >
                <XAxis dataKey="batch" stroke="#6B7280" />
                <YAxis allowDecimals={false} stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F46E5" name="Students" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HR Round Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">HR Round Results</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={hrRoundData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {hrRoundData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Technical Round Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Round Results</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={techRoundData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {techRoundData.map((entry, index) => (
                  <Cell key={`cell-tech-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Drilldown Section */}
      <section className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
        {/* Step 1: Select Trainer */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select Trainer</h2>
          <div className="flex flex-wrap gap-4">
            {trainersData.map((trainer) => (
              <button
                key={trainer.id}
                onClick={() => {
                  setSelectedTrainerId(trainer.id)
                  setSelectedBatchId(null)
                }}
                className={`px-4 py-2 rounded-md font-semibold border transition ${
                  selectedTrainerId === trainer.id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'
                }`}
              >
                {trainer.name} ({trainer.batches.length} batches)
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Batch */}
        {selectedTrainer && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Batch for {selectedTrainer.name}</h2>
            <div className="flex flex-wrap gap-4">
              {selectedTrainer.batches.map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  className={`px-4 py-2 rounded-md font-semibold border transition ${
                    selectedBatchId === batch.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'
                  }`}
                >
                  {batch.name} ({batch.students.length} students)
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Show Student List for selected batch */}
        {selectedBatch && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Students in {selectedBatch.name}</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">HR Round</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Technical Round</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedBatch.students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.progress}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.hrRound ? (
                        student.hrRound === 'pass' ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-600 inline" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 text-red-600 inline" />
                        )
                      ) : (
                        <>
                          <button
                            onClick={() => markRound(student.id, 'hrRound', 'pass')}
                            className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Pass
                          </button>
                          <button
                            onClick={() => markRound(student.id, 'hrRound', 'fail')}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Fail
                          </button>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.techRound ? (
                        student.techRound === 'pass' ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-600 inline" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 text-red-600 inline" />
                        )
                      ) : (
                        <>
                          <button
                            onClick={() => markRound(student.id, 'techRound', 'pass')}
                            className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Pass
                          </button>
                          <button
                            onClick={() => markRound(student.id, 'techRound', 'fail')}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Fail
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
