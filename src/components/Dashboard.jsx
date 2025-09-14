import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContractsTable from "./ContractsTable";
import UploadModal from "./UploadModal";

export default function Dashboard() {
    const [showUpload, setShowUpload] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Sidebar toggle state

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar with toggle logic */}
            <Sidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Overlay when sidebar is open on mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col sm:ml-64">
                <Topbar
                    onUpload={() => setShowUpload(true)}
                    onMenu={() => setSidebarOpen(true)} // ✅ Menu button toggles sidebar
                />
                <div className="p-4 overflow-auto flex-1">
                    <ContractsTable />
                </div>
            </div>

            {/* Upload Modal */}
            {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </div>
    );
}
