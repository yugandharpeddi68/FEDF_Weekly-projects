import { useState, useContext } from "react";
import StudentContext from "../StudentContext";

function StudentForm() {
  const [name, setName] = useState("");

  const { students, setStudents } = useContext(StudentContext);

  const addStudent = () => {
    if (name.trim() === "") return;

    setStudents([...students, name]);
    setName("");
  };

  return (
    <div className="card">
      <h3>Add Student</h3>

      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>
        Add Student
      </button>
    </div>
  );
}

export default StudentForm;