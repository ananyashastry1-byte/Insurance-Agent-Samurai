import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

const API = "http://localhost:8080/api";

function Customers() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

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

    const loadCustomers = async () => {
        try {
            const response = await axios.get(
                `${API}/customers`
            );

            setCustomers(response.data);
        } catch {
            alert("Unable to load customers.");
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addCustomer = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                `${API}/customers`,
                {
                    ...form,
                    annualIncome: Number(form.annualIncome)
                }
            );

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
            loadCustomers();

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Could not add customer."
            );
        }
    };

    const searchCustomer = async () => {

        if (!search.trim()) {
            loadCustomers();
            return;
        }

        try {

            const response = await axios.get(
                `${API}/customers/search/name`,
                {
                    params: { name: search }
                }
            );

            setCustomers(response.data);

        } catch {
            alert("Search failed.");
        }
    };

    const deleteCustomer = async (id) => {

        if (!window.confirm("Delete this customer?")) {
            return;
        }

        try {
            await axios.delete(`${API}/customers/${id}`);
            loadCustomers();
        } catch {
            alert("Could not delete customer.");
        }
    };

    return (
        <div className="customers-page">

            <header className="page-header">

                <div>
                    <h1>👥 Customers</h1>
                    <p>Manage insurance customers.</p>
                </div>

                <button onClick={() => navigate("/dashboard")}>
                    ← Dashboard
                </button>

            </header>

            <div className="customer-toolbar">

                <input
                    placeholder="Search customer by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={searchCustomer}>
                    🔎 Search
                </button>

                <button
                    className="add-customer"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Add Customer
                </button>

            </div>

            {showForm && (

                <form
                    className="customer-form"
                    onSubmit={addCustomer}
                >

                    <h2>Customer Information</h2>

                    <div className="form-grid">

                        <input
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
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                        <input
                            name="phone"
                            placeholder="10-digit phone"
                            value={form.phone}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
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
                            required
                        />

                        <input
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

            <div className="customer-grid">

                {customers.map((customer) => (

                    <div
                        className="customer-card"
                        key={customer.id}
                    >

                        <div className="customer-avatar">
                            👤
                        </div>

                        <h2>{customer.fullName}</h2>

                        <p>
                            📞 {customer.phone}
                        </p>

                        <p>
                            ✉️ {customer.email || "No email"}
                        </p>

                        <p>
                            💼 {customer.occupation || "Not specified"}
                        </p>

                        <p>
                            💰 ₹{Number(
                                customer.annualIncome
                            ).toLocaleString("en-IN")}
                        </p>

                        <button
                            className="delete-customer"
                            onClick={() =>
                                deleteCustomer(customer.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

            {customers.length === 0 && (
                <div className="empty-customers">
                    No customers found.
                </div>
            )}

        </div>
    );
}

export default Customers;