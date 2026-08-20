import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Policies.css";

const API = "https://insurance-agent-samurai-api.onrender.com/api";

const emptyForm = {
    policyName: "",
    policyType: "Life",
    description: "",
    basePremium: "",
    minimumCoverage: "",
    minimumAge: 18,
    maximumAge: 65,
    active: true
};

function Policies() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setForm({
            ...form,
            [name] :
                type === "checkbox"
                    ? checked
                    : value
        });
    };


    const openAddForm = () => {

        setEditingId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEditForm = (policy) => {

        setEditingId(policy.id);

        setForm({
            policyName: policy.policyName || "",
            policyType: policy.policyType || "Life",
            description: policy.description || "",
            basePremium: policy.basePremium ?? "",
            minimumCoverage: policy.minimumCoverage ?? "",
            minimumAge: policy.minimumAge ?? 18,
            maximumAge: policy.maximumAge ?? 65,
            active: policy.active ?? true
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const closeForm = () => {

        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const savePolicy = async (e) => {

        e.preventDefault();

        const policyData = {
            ...form,
            basePremium: Number(form.basePremium),
            minimumCoverage: Number(form.minimumCoverage),
            minimumAge: Number(form.minimumAge),
            maximumAge: Number(form.maximumAge)
        };

        try {

            if (editingId) {

                await axios.put(
                    `${API}/policies/${editingId}`,
                    policyData
                );

                alert("Policy updated successfully.");

            } else {

                await axios.post(
                    `${API}/policies`,
                    policyData
                );

                alert("Policy created successfully.");
            }

            closeForm();
            loadPolicies();

        } catch (err) {

            console.error(err);

            alert(
                editingId
                    ? "Could not update policy."
                    : "Could not create policy."
            );
        }
    };

    const deletePolicy = async (id) => {

        if (!window.confirm("Delete this policy?")) {
            return;
        }

        try {

            await axios.delete(
                `${API}/policies/${id}`
            );

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

                    <p>
                        Manage your insurance policy catalog.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>

            </header>

            <div className="policy-toolbar">

                <input
                    type="text"
                    placeholder="Search policy name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button onClick={searchByName}>
                    🔎 Search
                </button>

                <select
                    value={type}
                    onChange={(e) =>
                        searchByType(e.target.value)
                    }
                >
                    <option value="">
                        All Types
                    </option>

                    <option value="Life">
                        Life
                    </option>

                    <option value="Health">
                        Health
                    </option>

                    <option value="Vehicle">
                        Vehicle
                    </option>

                    <option value="Home">
                        Home
                    </option>
                </select>

                <button
                    className="add-button"
                    onClick={openAddForm}
                >
                    + Add Policy
                </button>

            </div>

            {showForm && (

                <form
                    className="policy-form"
                    onSubmit={savePolicy}
                >

                    <div className="form-header">

                        <h2>
                            {editingId
                                ? "Edit Insurance Policy"
                                : "Add Insurance Policy"}
                        </h2>

                        <button
                            type="button"
                            onClick={closeForm}
                        >
                            ✕
                        </button>

                    </div>

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
                        min="0"
                        required
                    />

                    <input
                        type="number"
                        name="minimumCoverage"
                        placeholder="Minimum coverage"
                        value={form.minimumCoverage}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                    <div className="form-row">

                        <input
                            type="number"
                            name="minimumAge"
                            placeholder="Minimum age"
                            value={form.minimumAge}
                            onChange={handleChange}
                            min="1"
                            required
                        />

                        <input
                            type="number"
                            name="maximumAge"
                            placeholder="Maximum age"
                            value={form.maximumAge}
                            onChange={handleChange}
                            min="1"
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

                    <div className="form-buttons">

                        <button type="submit">
                            {editingId
                                ? "Update Policy"
                                : "Save Policy"}
                        </button>

                        <button
                            type="button"
                            onClick={closeForm}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            {error && (
                <div className="page-error">
                    {error}
                </div>
            )}

            {loading ? (

                <p>Loading policies...</p>

            ) : policies.length === 0 ? (

                <div className="empty-state">
                    No policies found.
                </div>

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

                                <span
                                    className={
                                        policy.active
                                            ? "active"
                                            : "inactive"
                                    }
                                >
                                    {policy.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </div>

                            <h2>
                                {policy.policyName}
                            </h2>

                            <p>
                                {policy.description}
                            </p>

                            <div className="policy-details">

                                <div>
                                    <small>
                                        Base Premium
                                    </small>

                                    <strong>
                                        ₹{Number(
                                            policy.basePremium
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>

                                <div>
                                    <small>
                                        Coverage
                                    </small>

                                    <strong>
                                        ₹{Number(
                                            policy.minimumCoverage
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>

                                <div>
                                    <small>
                                        Age
                                    </small>

                                    <strong>
                                        {policy.minimumAge}
                                        {" - "}
                                        {policy.maximumAge}
                                    </strong>
                                </div>

                            </div>

                            <div className="policy-actions">

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        openEditForm(policy)
                                    }
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deletePolicy(
                                            policy.id
                                        )
                                    }
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Policies;