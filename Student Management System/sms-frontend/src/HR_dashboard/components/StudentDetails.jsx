import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

// Mock data
const studentsData = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '123-456-7890',
        address: '123 Main St, New York, NY',
        batch: 'Batch A',
        trainerName: 'John Doe',
        batchTime: 'Mon-Fri, 10:00 AM - 12:00 PM',
        progress: 96,
        hrStatus: null,
        techStatus: null,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkef52w0niX4i-Xg3rsYLIJ9T_i1-9y82MIQ&s',
        attendance: [90, 100, 85, 95, 100, 92, 88],
    },
    // ... other students
]


export default function StudentDetails() {
    const { id } = useParams()
    const [student, setStudent] = useState(null)

    useEffect(() => {
        const found = studentsData.find((s) => s.id === parseInt(id))
        setStudent(found)
    }, [id])

    if (!student) return <p className="p-4 text-red-600">Student not found</p>

    const progressData = [
        { name: 'Progress', value: student.progress, fill: '#8884d8' },
    ]

    const attendanceData = student.attendance.map((value, index) => ({
        name: `Day ${index + 1}`,
        Attendance: value,
    }))

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded mt-10">
            <div className="flex items-center gap-6 mb-6">
                <img
                    src={student.image}
                    alt={student.name}
                    className="w-28 h-28 rounded-full border-2 border-blue-500"
                />
                <div>
                    <h1 className="text-2xl font-bold">{student.name}</h1>
                    <p className="text-gray-600">{student.email}</p>
                    <p className="text-gray-600">{student.phone}</p>
                    <p className="text-gray-600">{student.address}</p>
                    <p className="text-gray-800 font-semibold">Batch: {student.batch}</p>
                    <p className="text-gray-700">Trainer: <span className="font-semibold">{student.trainerName}</span></p>
                    <p className="text-gray-700">Batch Time: <span className="font-semibold">{student.batchTime}</span></p>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 border rounded">
                    <h2 className="font-semibold mb-2">Progress</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <RadialBarChart
                            innerRadius="80%"
                            outerRadius="100%"
                            data={progressData}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar background dataKey="value" cornerRadius={10} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <p className="text-center mt-2 text-xl font-bold text-blue-600">
                        {student.progress}%
                    </p>
                </div>

                <div className="p-4 border rounded">
                    <h2 className="font-semibold mb-2">Weekly Attendance</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="Attendance" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded">
                    <h2 className="font-semibold">HR Round</h2>
                    <p
                        className={`font-bold ${student.hrStatus === 'Pass'
                                ? 'text-green-600'
                                : student.hrStatus === 'Fail'
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                            }`}
                    >
                        {student.hrStatus || 'Pending'}
                    </p>
                </div>

                <div className="p-4 border rounded">
                    <h2 className="font-semibold">Tech Round</h2>
                    <p
                        className={`font-bold ${student.techStatus === 'Pass'
                                ? 'text-green-600'
                                : student.techStatus === 'Fail'
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                            }`}
                    >
                        {student.techStatus || 'Pending'}
                    </p>
                </div>
            </div>

            <Link to="/hr/students" className="inline-block mt-6 text-blue-600 hover:underline">
                ← Back to Students
            </Link>
        </div>
    )
}
