// src/components/ContractsTable.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ContractsTable() {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [riskFilter, setRiskFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch("/contracts.json")
            .then(res => res.json())
            .then(data => {
                setContracts(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load contracts.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = contracts;
        if (search) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.parties.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (statusFilter) {
            result = result.filter(c => c.status === statusFilter);
        }
        if (riskFilter) {
            result = result.filter(c => c.risk === riskFilter);
        }
        setFilteredContracts(result);
        setPage(1);
    }, [contracts, search, statusFilter, riskFilter]);

    const totalPages = Math.ceil(filteredContracts.length / rowsPerPage);
    const displayedContracts = filteredContracts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleRowClick = (id) => {
        navigate(`/contract/${id}`);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!filteredContracts.length) return <div className="p-4">No contracts yet.</div>;

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or parties"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded w-full sm:w-1/3"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded w-full sm:w-1/4"
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Renewal Due">Renewal Due</option>
                </select>
                <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="p-2 border rounded w-full sm:w-1/4"
                >
                    <option value="">All Risks</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Name</th>
                            <th className="border border-gray-300 p-2 text-left">Parties</th>
                            <th className="border border-gray-300 p-2 text-left">Expiry</th>
                            <th className="border border-gray-300 p-2 text-left">Status</th>
                            <th className="border border-gray-300 p-2 text-left">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedContracts.map(contract => (
                            <tr
                                key={contract.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRowClick(contract.id)}
                            >
                                <td className="border border-gray-300 p-2">{contract.name}</td>
                                <td className="border border-gray-300 p-2">{contract.parties}</td>
                                <td className="border border-gray-300 p-2">{contract.expiry}</td>
                                <td className="border border-gray-300 p-2">{contract.status}</td>
                                <td className="border border-gray-300 p-2">{contract.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
