// src/components/ContractDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ContractDetail() {
    const { id } = useParams();
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`/contracts/${id}.json`)
            .then(res => {
                if (!res.ok) throw new Error("Contract not found");
                return res.json();
            })
            .then(data => {
                setContract(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

    return (
        <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow-md">
            <Link to="/dashboard" className="text-blue-600 underline mb-4 inline-block">← Back to Dashboard</Link>
            <h2 className="text-2xl font-bold mb-4">{contract.name}</h2>

            <div className="space-y-2 mb-6">
                <p><strong>Parties:</strong> {contract.parties}</p>
                <p><strong>Start Date:</strong> {contract.start}</p>
                <p><strong>Expiry Date:</strong> {contract.expiry}</p>
                <p><strong>Status:</strong> {contract.status}</p>
                <p><strong>Risk Score:</strong> {contract.risk}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Clauses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {contract.clauses.map((clause, index) => (
                    <div key={index} className="p-4 border rounded shadow-sm">
                        <h4 className="font-bold mb-2">{clause.title}</h4>
                        <p className="mb-2">{clause.summary}</p>
                        <span className="text-sm text-gray-600">Confidence: {(clause.confidence * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
            <ul className="mb-6 space-y-3">
                {contract.insights.map((insight, index) => (
                    <li key={index} className="p-3 border rounded bg-gray-50">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${insight.risk === 'High' ? 'bg-red-300' : insight.risk === 'Medium' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                            {insight.risk}
                        </span>
                        <p className="mt-1">{insight.message}</p>
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Evidence</h3>
            <div className="space-y-4 mb-6">
                {contract.evidence.map((evidence, index) => (
                    <div key={index} className="p-3 border rounded bg-gray-50">
                        <p><strong>Source:</strong> {evidence.source}</p>
                        <p>{evidence.snippet}</p>
                        <p className="text-sm text-gray-600">Relevance: {(evidence.relevance * 100).toFixed(0)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
