import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/agents/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "agent",
                JSON.stringify(response.data.agent)
            );

            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo">
                    🛡️
                </div>

                <h1>Insurance Agent Samurai</h1>

                <p className="subtitle">
                    Insurance Agent Portal
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="register-text">
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;