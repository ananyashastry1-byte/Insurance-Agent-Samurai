import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Calculator.css";

function Calculator() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        age: "",
        insuranceType: "life",
        coverageAmount: "",
        policyTerm: ""
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const calculate = async (e) => {

        e.preventDefault();

        setError("");
        setResult(null);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/premium/calculate",
                {
                    age: Number(form.age),
                    insuranceType: form.insuranceType,
                    coverageAmount: Number(
                        form.coverageAmount
                    ),
                    policyTerm: Number(form.policyTerm)
                }
            );

            setResult(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to calculate premium."
            );
        }
    };

    return (
        <div className="calculator-page">

            <header className="page-header">

                <div>
                    <h1>💰 Premium Calculator</h1>
                    <p>
                        Calculate an illustrative insurance premium.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </header>

            <div className="calculator-layout">

                <form
                    className="calculator-card"
                    onSubmit={calculate}
                >

                    <h2>Premium Details</h2>

                    <label>Customer Age</label>

                    <input
                        type="number"
                        name="age"
                        min="18"
                        max="80"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />

                    <label>Insurance Type</label>

                    <select
                        name="insuranceType"
                        value={form.insuranceType}
                        onChange={handleChange}
                    >
                        <option value="life">Life</option>
                        <option value="health">Health</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="home">Home</option>
                    </select>

                    <label>Coverage Amount</label>

                    <input
                        type="number"
                        name="coverageAmount"
                        placeholder="Example: 1000000"
                        value={form.coverageAmount}
                        onChange={handleChange}
                        required
                    />

                    <label>Policy Term (Years)</label>

                    <input
                        type="number"
                        name="policyTerm"
                        min="1"
                        max="50"
                        placeholder="Example: 10"
                        value={form.policyTerm}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div className="calculator-error">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Calculate Premium
                    </button>

                </form>

                <div className="result-card">

                    <h2>Estimated Premium</h2>

                    {!result ? (
                        <div className="no-result">
                            Enter customer and policy details
                            to calculate an estimate.
                        </div>
                    ) : (

                        <>

                            <div className="premium-value">
                                ₹{Number(
                                    result.estimatedMonthlyPremium
                                ).toLocaleString("en-IN")}
                            </div>

                            <p>Estimated Monthly Premium</p>

                            <div className="result-details">

                                <div>
                                    <span>Insurance</span>
                                    <strong>
                                        {result.insuranceType}
                                    </strong>
                                </div>

                                <div>
                                    <span>Age</span>
                                    <strong>
                                        {result.age}
                                    </strong>
                                </div>

                                <div>
                                    <span>Coverage</span>
                                    <strong>
                                        ₹{Number(
                                            result.coverageAmount
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>

                                <div>
                                    <span>Term</span>
                                    <strong>
                                        {result.policyTerm} years
                                    </strong>
                                </div>

                            </div>

                            <div className="estimate-note">
                                ⚠️ {result.note}
                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Calculator;