import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar({ onUpload, onMenu }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex justify-between items-center bg-white p-4 border-b">
            <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <button
                    onClick={onMenu}
                    className="sm:hidden p-2 rounded hover:bg-gray-100"
                >
                    ☰
                </button>
                <h1 className="text-lg font-bold">Contracts Dashboard</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <button
                    onClick={onUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Upload Files
                </button>
                <div className="flex items-center space-x-2">
                    <span className="font-medium">{user.username}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
