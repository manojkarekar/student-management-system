const StudentInfo = ({ student }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Student Information</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Trainer:</strong> {student.trainer}</p>
      <p><strong>Batch Time:</strong> {student.batchTime}</p>
    </div>
  );
  
  export default StudentInfo;
  