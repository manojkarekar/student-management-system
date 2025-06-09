import { useState } from 'react'

// Mock data
const studentsData = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    batch: 'Batch A',
    progress: 96,
    hrStatus: null,
    techStatus: null,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    batch: 'Batch B',
    progress: 88,
    hrStatus: 'Pass',
    techStatus: null,
  },
  {
    id: 3,
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    batch: 'Batch A',
    progress: 99,
    hrStatus: 'Fail',
    techStatus: 'Pass',
  },
  {
    id: 4,
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    batch: 'Batch C',
    progress: 99,
    hrStatus: 'Fail',
    techStatus: 'Pass',
  },
]

export const Students = () => {
  const [students, setStudents] = useState(studentsData)
  const [search, setSearch] = useState('')

  const filtered = students.filter((s) =>
    [s.name, s.email, s.batch].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  )

  const updateStatus = (id, round, status) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [round]: status } : s
      )
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or batch"
          className="w-full max-w-md px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Batch</th>
              <th className="py-2 px-4">Progress</th>
              <th className="py-2 px-4">HR Round</th>
              <th className="py-2 px-4">Tech Round</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.batch}</td>
                <td className="py-2 px-4 w-48">
                  <div className="bg-gray-200 h-3 rounded-full">
                    <div
                      className={`h-3 rounded-full ${
                        student.progress >= 95
                          ? 'bg-green-500'
                          : 'bg-blue-400'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{student.progress}%</span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-1">
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        student.hrStatus === 'Pass'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => updateStatus(student.id, 'hrStatus', 'Pass')}
                    >
                      Pass
                    </button>
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        student.hrStatus === 'Fail'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => updateStatus(student.id, 'hrStatus', 'Fail')}
                    >
                      Fail
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-1">
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        student.techStatus === 'Pass'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => updateStatus(student.id, 'techStatus', 'Pass')}
                    >
                      Pass
                    </button>
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        student.techStatus === 'Fail'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => updateStatus(student.id, 'techStatus', 'Fail')}
                    >
                      Fail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
