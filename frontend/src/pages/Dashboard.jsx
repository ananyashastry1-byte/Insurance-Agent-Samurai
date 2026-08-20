import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API = "https://insurance-agent-samurai-api.onrender.com/api";

function Dashboard() {

    const navigate = useNavigate();

    const [agent, setAgent] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {

        const savedAgent = localStorage.getItem("agent");

        if (!savedAgent) {
            navigate("/login");
            return;
        }

        setAgent(JSON.parse(savedAgent));

        loadDashboardData();

    }, [navigate]);

    const loadDashboardData = async () => {

        setLoading(true);

        try {

            const [policyResponse, customerResponse] =
                await Promise.all([
                    axios.get(`${API}/policies`),
                    axios.get(`${API}/customers`)
                ]);

            setPolicies(policyResponse.data);
            setCustomers(customerResponse.data);

            setLastUpdated(
                new Date().toLocaleTimeString()
            );

        } catch (error) {

            console.error(
                "Could not load dashboard data",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const logout = () => {

        localStorage.removeItem("agent");

        navigate("/login");
    };

    const activePolicies = policies.filter(
        (policy) => policy.active
    ).length;

    const lifePolicies = policies.filter(
        (policy) => policy.policyType === "Life"
    ).length;

    const healthPolicies = policies.filter(
        (policy) => policy.policyType === "Health"
    ).length;

    const vehiclePolicies = policies.filter(
        (policy) => policy.policyType === "Vehicle"
    ).length;

    return (
        <div className="dashboard">

            <header className="topbar">

                <div className="brand">
                    🛡️ Insurance Agent Samurai
                </div>

                <div className="agent-info">

                    <span>
                        👤 {agent?.fullName || "Agent"}
                    </span>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

            </header>

            <div className="dashboard-layout">

                <aside className="sidebar">

                    <button
                        className="menu-item active"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        📊 Dashboard
                    </button>

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/policies")
                        }
                    >
                        📋 Policies
                    </button>

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/customers")
                        }
                    >
                        👥 Customers
                    </button>

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/calculator")
                        }
                    >
                        💰 Premium Calculator
                    </button>

                </aside>

                <main className="dashboard-content">

                    <div className="welcome">

                        <div>
                            <h1>
                                Welcome,{" "}
                                {agent?.fullName || "Agent"}!
                            </h1>

                            <p>
                                Manage your insurance activities
                                from one place.
                            </p>
                        </div>

                        <button
                            className="refresh-button"
                            onClick={loadDashboardData}
                        >
                            🔄 Refresh
                        </button>

                    </div>

                    <div className="dashboard-status">

                        <span>
                            {loading
                                ? "Updating dashboard..."
                                : "● Dashboard up to date"}
                        </span>

                        {lastUpdated && (
                            <span>
                                Last updated: {lastUpdated}
                            </span>
                        )}

                    </div>

                    <div className="stats">

                        <div className="stat-card">

                            <div className="stat-icon">
                                📋
                            </div>

                            <div>
                                <h3>
                                    Insurance Policies
                                </h3>

                                <strong>
                                    {loading
                                        ? "..."
                                        : policies.length}
                                </strong>

                            </div>

                        </div>

                        <div className="stat-card">

                            <div className="stat-icon">
                                👥
                            </div>

                            <div>
                                <h3>
                                    Customers
                                </h3>

                                <strong>
                                    {loading
                                        ? "..."
                                        : customers.length}
                                </strong>

                            </div>

                        </div>

                        <div className="stat-card">

                            <div className="stat-icon">
                                🟢
                            </div>

                            <div>
                                <h3>
                                    Active Policies
                                </h3>

                                <strong>
                                    {loading
                                        ? "..."
                                        : activePolicies}
                                </strong>

                            </div>

                        </div>

                    </div>

                    <div className="dashboard-grid">

                        <div className="summary-card">

                            <h2>
                                📊 Policy Overview
                            </h2>

                            <div className="summary-row">

                                <span>
                                    Life Insurance
                                </span>

                                <strong>
                                    {lifePolicies}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Health Insurance
                                </span>

                                <strong>
                                    {healthPolicies}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Vehicle Insurance
                                </span>

                                <strong>
                                    {vehiclePolicies}
                                </strong>

                            </div>

                        </div>

                        <div className="summary-card">

                            <h2>
                                ⚡ Quick Actions
                            </h2>

                            <div className="quick-actions">

                                <button
                                    onClick={() =>
                                        navigate("/policies")
                                    }
                                >
                                    📋
                                    <span>
                                        View Policies
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/customers")
                                    }
                                >
                                    👥
                                    <span>
                                        Manage Customers
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/calculator")
                                    }
                                >
                                    💰
                                    <span>
                                        Calculate Premium
                                    </span>
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="calculator-banner">

                        <div>

                            <h2>
                                💰 Premium Calculator
                            </h2>

                            <p>
                                Calculate an illustrative
                                monthly insurance premium
                                based on customer details.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/calculator")
                            }
                        >
                            Open Calculator →
                        </button>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;