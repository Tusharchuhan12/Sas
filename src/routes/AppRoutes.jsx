import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import ContractDetail from "../components/ContractDetail";

export default function AppRoutes() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/contract/:id" element={user ? <ContractDetail /> : <Navigate to="/" />} />
        </Routes>
    );
}
