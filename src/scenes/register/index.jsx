import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");         // <-- Added name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      setError("User already exists");
      return;
    }

    // Add new user with default role "user" and provided name
    users.push({ name, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-container" style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: 15 }} type="submit">Register</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
