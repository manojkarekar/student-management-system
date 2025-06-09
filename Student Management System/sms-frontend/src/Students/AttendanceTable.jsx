const AttendanceTable = ({ logs }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Attendance Log</h2>
      <table className="w-full text-sm text-left border border-gray-300">
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">In-Time</th>
            <th className="px-4 py-2 border">Out-Time</th>
            <th className="px-4 py-2 border">Course</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{log.date}</td>
              <td className="px-4 py-2 border">{log.inTime}</td>
              <td className="px-4 py-2 border">{log.outTime}</td>
              <td className="px-4 py-2 border">{log.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default AttendanceTable;
  