import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

// Mock data
const mockTrainers = [
  { id: 1, name: 'John Doe', email: 'john@training.com', subject: 'React' },
  { id: 2, name: 'Jane Smith', email: 'jane@training.com', subject: 'Node.js' },
]

const mockStudents = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Lee' },
  { id: 4, name: 'David Miller' },
  { id: 5, name: 'Eve Adams' },
  { id: 6, name: 'Frank Liu' },
  { id: 7, name: 'Grace Hopper' },
]

const mockBatches = [
  {
    trainerId: 1,
    id: 101,
    name: 'React Beginners',
    status: 'ongoing',
    studentIds: [1, 2, 3],
  },
  {
    trainerId: 1,
    id: 102,
    name: 'React Advanced',
    status: 'completed',
    studentIds: [4, 5],
  },
  {
    trainerId: 2,
    id: 201,
    name: 'Node Basics',
    status: 'ongoing',
    studentIds: [6, 7],
  },
]

const COLORS = ['#8884d8', '#82ca9d']

export default function TrainerDetails() {
  const { id } = useParams()
  const trainerId = parseInt(id)
  const [trainer, setTrainer] = useState(null)
  const [batches, setBatches] = useState([])

  useEffect(() => {
    const foundTrainer = mockTrainers.find((t) => t.id === trainerId)
    const relatedBatches = mockBatches.filter((b) => b.trainerId === trainerId)
    setTrainer(foundTrainer)
    setBatches(relatedBatches)
  }, [trainerId])

  if (!trainer) {
    return <p className="text-center text-red-500 mt-10">Trainer not found.</p>
  }

  const ongoing = batches.filter((b) => b.status === 'ongoing').length
  const completed = batches.filter((b) => b.status === 'completed').length

  const summaryData = [
    { name: 'Ongoing', count: ongoing },
    { name: 'Completed', count: completed },
  ]

  const getStudentName = (id) => {
    const student = mockStudents.find((s) => s.id === id)
    return student ? student.name : 'Unknown'
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded shadow-md mt-10  ">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Trainer Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Trainer Information</h2>
        <p><strong>Name:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Subject:</strong> {trainer.subject}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Batch Summary (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summaryData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Batch Summary (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Batches</h2>
        {batches.map((batch) => (
          <div key={batch.id} className="border p-4 mb-4 rounded bg-white shadow-sm">
            <h3 className="text-lg font-bold">{batch.name}</h3>
            <p className="text-sm mb-2">
              Status: <span className={batch.status === 'ongoing' ? 'text-blue-600' : 'text-green-600'}>
                {batch.status}
              </span>
            </p>
            <div>
              <p className="font-semibold mb-1">Students:</p>
              <ul className="list-disc list-inside space-y-1">
                {batch.studentIds.map((studentId) => (
                  <li key={studentId}>
                    <Link
                      to={`/student/${studentId}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {getStudentName(studentId)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
