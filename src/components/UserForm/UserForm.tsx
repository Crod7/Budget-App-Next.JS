// components/UserForm.js

import React, { useState } from "react";

type PostProps = {
  name: string;
}

function UserForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/database/users/createUser", {
        method: "POST",
        body: JSON.stringify({ name }), // Send the user data as JSON
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("User created successfully!");
      } else {
        setMessage("Error creating user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error creating user.");
    }
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UserForm;
