import React, { useState } from "react";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      `Registration Successful!
Name: ${name}
Email: ${email}
Course: ${course}`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <label>Course:</label>
        <br />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}

export default RegistrationForm;