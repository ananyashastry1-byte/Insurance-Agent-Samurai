import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "https://insurance-agent-samurai-api.onrender.com/api/agents/login",
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Login response:", response.data);

            localStorage.setItem(
                "agent",
                JSON.stringify(response.data.agent)
            );

            navigate("/dashboard");

        } catch (err) {
            console.error("Login error:", err);

            if (err.response) {
                console.error(
                    "Status:",
                    err.response.status
                );

                console.error(
                    "Response:",
                    err.response.data
                );

                if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } else {
                    setError(
                        err.response.data?.error ||
                        err.response.data?.message ||
                        `Login failed (${err.response.status})`
                    );
                }

            } else if (err.request) {
                setError(
                    "Could not connect to the server. Please try again."
                );

            } else {
                setError(
                    "Login failed. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo">
                    🛡️
                </div>

                <h1>
                    Insurance Agent Samurai
                </h1>

                <p className="subtitle">
                    Insurance Agent Portal
                </p>

                <form onSubmit={handleLogin}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

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

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <p className="register-text">
                    Don't have an account?

                    <Link to="/register">
                        {" "}Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;