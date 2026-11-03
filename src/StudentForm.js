
import React, { useState } from "react";

function StudentForm() {
  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    email: "",
    mobile: "",
    branch: ""
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.rollNo.trim() || !form.name.trim()) {
      setMessage("Roll Number and Name are required!");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setMessage("Mobile number must contain exactly 10 digits.");
      return;
    }

    if (students.some(s => s.rollNo === form.rollNo.trim())) {
      setMessage("Roll Number already exists!");
      return;
    }

    setStudents([...students, {
      ...form,
      rollNo: form.rollNo.trim(),
      name: form.name.trim()
    }]);

    setMessage("Student registered successfully!");

    setForm({
      rollNo: "",
      name: "",
      email: "",
      mobile: "",
      branch: ""
    });
  };

  const deleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
    setMessage("Student deleted successfully!");
  };

  return (
    <div className="container">
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rollNo"
          placeholder="Roll Number"
          value={form.rollNo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="CSE-Data Science">CSE-Data Science</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
        </select>

        <button type="submit">Register Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Registered Students</h2>

      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
              <td>{student.branch}</td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteStudent(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentForm;
