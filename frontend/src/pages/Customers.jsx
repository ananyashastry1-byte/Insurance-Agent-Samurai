import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

const API = "https://insurance-agent-samurai-api.onrender.com/api";

function Customers() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "Male",
        phone: "",
        email: "",
        address: "",
        occupation: "",
        annualIncome: ""
    });

    // Load all customers
    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(`${API}/customers`);

            console.log("Customers API response:", response.data);

            if (Array.isArray(response.data)) {
                setCustomers(response.data);
            } else {
                setCustomers([]);
                setError("Invalid customer data received.");
            }

        } catch (err) {
            console.error("Unable to load customers:", err);

            setCustomers([]);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Unable to load customers."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Handle form fields
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add customer
    const addCustomer = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const customerData = {
                fullName: form.fullName,
                dateOfBirth: form.dateOfBirth,
                gender: form.gender,
                phone: form.phone,
                email: form.email,
                address: form.address,
                occupation: form.occupation,
                annualIncome: Number(form.annualIncome)
            };

            const response = await axios.post(
                `${API}/customers`,
                customerData
            );

            console.log("Customer created:", response.data);

            setForm({
                fullName: "",
                dateOfBirth: "",
                gender: "Male",
                phone: "",
                email: "",
                address: "",
                occupation: "",
                annualIncome: ""
            });

            setShowForm(false);

            await loadCustomers();

        } catch (err) {
            console.error("Could not add customer:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Could not add customer."
            );
        }
    };

    // Search customers
    const searchCustomer = async () => {
        if (!search.trim()) {
            await loadCustomers();
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/customers/search/name`,
                {
                    params: {
                        name: search
                    }
                }
            );

            console.log("Search response:", response.data);

            if (Array.isArray(response.data)) {
                setCustomers(response.data);
            } else {
                setCustomers([]);
            }

        } catch (err) {
            console.error("Search failed:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Search failed."
            );

            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete customer
    const deleteCustomer = async (id) => {
        if (!window.confirm("Delete this customer?")) {
            return;
        }

        try {
            setError("");

            await axios.delete(`${API}/customers/${id}`);

            await loadCustomers();

        } catch (err) {
            console.error("Could not delete customer:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Could not delete customer."
            );
        }
    };

    return (
        <div className="customers-page">

            {/* Header */}
            <header className="page-header">

                <div>
                    <h1>👥 Customers</h1>
                    <p>Manage insurance customers.</p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </header>

            {/* Search toolbar */}
            <div className="customer-toolbar">

                <input
                    type="text"
                    placeholder="Search customer by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchCustomer();
                        }
                    }}
                />

                <button
                    type="button"
                    onClick={searchCustomer}
                >
                    🔎 Search
                </button>

                <button
                    type="button"
                    className="add-customer"
                    onClick={() => {
                        setShowForm(!showForm);
                        setError("");
                    }}
                >
                    + Add Customer
                </button>

            </div>

            {/* Error */}
            {error && (
                <div
                    style={{
                        margin: "20px 0",
                        padding: "12px 16px",
                        backgroundColor: "#ffe5e5",
                        color: "#c62828",
                        borderRadius: "8px",
                        fontWeight: "500"
                    }}
                >
                    {error}
                </div>
            )}

            {/* Add customer form */}
            {showForm && (
                <form
                    className="customer-form"
                    onSubmit={addCustomer}
                >

                    <h2>Customer Information</h2>

                    <div className="form-grid">

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <input
                            type="text"
                            name="phone"
                            placeholder="10-digit phone"
                            value={form.phone}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            maxLength="10"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="occupation"
                            placeholder="Occupation"
                            value={form.occupation}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="annualIncome"
                            placeholder="Annual income"
                            value={form.annualIncome}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type="submit">
                        Save Customer
                    </button>

                </form>
            )}

            {/* Customer list */}
            <div className="customer-grid">

                {loading ? (

                    <div className="empty-customers">
                        Loading customers...
                    </div>

                ) : customers.length > 0 ? (

                    customers.map((customer) => (

                        <div
                            className="customer-card"
                            key={customer.id}
                        >

                            <div className="customer-avatar">
                                👤
                            </div>

                            <h2>
                                {customer.fullName}
                            </h2>

                            <p>
                                📞 {customer.phone}
                            </p>

                            <p>
                                ✉️{" "}
                                {customer.email || "No email"}
                            </p>

                            <p>
                                💼{" "}
                                {customer.occupation ||
                                    "Not specified"}
                            </p>

                            <p>
                                📅{" "}
                                {customer.dateOfBirth ||
                                    "Not specified"}
                            </p>

                            <p>
                                📍{" "}
                                {customer.address ||
                                    "Not specified"}
                            </p>

                            <p>
                                💰 ₹
                                {Number(
                                    customer.annualIncome || 0
                                ).toLocaleString("en-IN")}
                            </p>

                            <button
                                type="button"
                                className="delete-customer"
                                onClick={() =>
                                    deleteCustomer(customer.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))

                ) : (

                    <div className="empty-customers">
                        No customers found.
                    </div>

                )}

            </div>

        </div>
    );
}

export default Customers;