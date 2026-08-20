import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Policies.css";

const API = "http://localhost:8080/api";

function Policies() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        policyName: "",
        policyType: "Life",
        description: "",
        basePremium: "",
        minimumCoverage: "",
        minimumAge: 18,
        maximumAge: 65,
        active: true
    });

    const [showForm, setShowForm] = useState(false);

    const loadPolicies = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${API}/policies`
            );

            setPolicies(response.data);
            setError("");

        } catch (err) {
            setError("Unable to load policies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPolicies();
    }, []);

    const searchByName = async () => {

        if (!search.trim()) {
            loadPolicies();
            return;
        }

        try {
            const response = await axios.get(
                `${API}/policies/search/name`,
                {
                    params: { name: search }
                }
            );

            setPolicies(response.data);

        } catch {
            setError("Search failed.");
        }
    };

    const searchByType = async (selectedType) => {

        setType(selectedType);

        if (!selectedType) {
            loadPolicies();
            return;
        }

        try {
            const response = await axios.get(
                `${API}/policies/search/type`,
                {
                    params: { type: selectedType }
                }
            );

            setPolicies(response.data);

        } catch {
            setError("Filter failed.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const createPolicy = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                `${API}/policies`,
                {
                    ...form,
                    basePremium: Number(form.basePremium),
                    minimumCoverage: Number(form.minimumCoverage),
                    minimumAge: Number(form.minimumAge),
                    maximumAge: Number(form.maximumAge)
                }
            );

            setShowForm(false);

            setForm({
                policyName: "",
                policyType: "Life",
                description: "",
                basePremium: "",
                minimumCoverage: "",
                minimumAge: 18,
                maximumAge: 65,
                active: true
            });

            loadPolicies();

        } catch (err) {
            alert("Could not create policy.");
        }
    };

    const deletePolicy = async (id) => {

        if (!window.confirm("Delete this policy?")) {
            return;
        }

        try {
            await axios.delete(`${API}/policies/${id}`);
            loadPolicies();
        } catch {
            alert("Could not delete policy.");
        }
    };

    return (
        <div className="policies-page">

            <header className="page-header">

                <div>
                    <h1>📋 Insurance Policies</h1>
                    <p>Manage your insurance policy catalog.</p>
                </div>

                <button onClick={() => navigate("/dashboard")}>
                    ← Dashboard
                </button>

            </header>

            <div className="policy-toolbar">

                <input
                    type="text"
                    placeholder="Search policy name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={searchByName}>
                    🔎 Search
                </button>

                <select
                    value={type}
                    onChange={(e) => searchByType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Life">Life</option>
                    <option value="Health">Health</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Home">Home</option>
                </select>

                <button
                    className="add-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Add Policy
                </button>

            </div>

            {showForm && (
                <form
                    className="policy-form"
                    onSubmit={createPolicy}
                >

                    <h2>Add Insurance Policy</h2>

                    <input
                        name="policyName"
                        placeholder="Policy name"
                        value={form.policyName}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="policyType"
                        value={form.policyType}
                        onChange={handleChange}
                    >
                        <option>Life</option>
                        <option>Health</option>
                        <option>Vehicle</option>
                        <option>Home</option>
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="basePremium"
                        placeholder="Base premium"
                        value={form.basePremium}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="minimumCoverage"
                        placeholder="Minimum coverage"
                        value={form.minimumCoverage}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-row">

                        <input
                            type="number"
                            name="minimumAge"
                            placeholder="Minimum age"
                            value={form.minimumAge}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="maximumAge"
                            placeholder="Maximum age"
                            value={form.maximumAge}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        Active policy
                    </label>

                    <button type="submit">
                        Save Policy
                    </button>

                </form>
            )}

            {error && (
                <div className="page-error">{error}</div>
            )}

            {loading ? (
                <p>Loading policies...</p>
            ) : (
                <div className="policy-grid">

                    {policies.map((policy) => (

                        <div
                            className="policy-card"
                            key={policy.id}
                        >

                            <div className="policy-card-header">
                                <span className="policy-type">
                                    {policy.policyType}
                                </span>

                                <span className={
                                    policy.active
                                        ? "active"
                                        : "inactive"
                                }>
                                    {policy.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>

                            <h2>{policy.policyName}</h2>

                            <p>{policy.description}</p>

                            <div className="policy-details">

                                <div>
                                    <small>Base Premium</small>
                                    <strong>
                                        ₹{Number(
                                            policy.basePremium
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>

                                <div>
                                    <small>Coverage</small>
                                    <strong>
                                        ₹{Number(
                                            policy.minimumCoverage
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>

                                <div>
                                    <small>Age</small>
                                    <strong>
                                        {policy.minimumAge} -{" "}
                                        {policy.maximumAge}
                                    </strong>
                                </div>

                            </div>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    deletePolicy(policy.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Policies;