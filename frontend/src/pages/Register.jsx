import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post(
                "http://localhost:8080/api/agents/register",
                form
            );

            setSuccess("Registration successful! You can now login.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-logo">🛡️</div>

                <h1>Create Agent Account</h1>

                <p className="register-subtitle">
                    Join Insurance Agent Samurai
                </p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone</label>

                    <input
                        type="text"
                        name="phone"
                        placeholder="10-digit phone number"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="register-success">
                            {success}
                        </div>
                    )}

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                <p className="login-link">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;