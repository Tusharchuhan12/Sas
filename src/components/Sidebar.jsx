export default function Sidebar({ onClose, sidebarOpen }) {
    return (
        <div
            className={`fixed inset-y-0 left-0 bg-white w-64 border-r h-full p-4
                        transform transition-transform duration-200 ease-in-out z-50
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        >
            {/* Mobile close button */}
            <div className="flex justify-between items-center mb-6 sm:hidden">
                <h1 className="text-xl font-bold">SaaS Dashboard</h1>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                    ✕
                </button>
            </div>

            {/* Navigation */}
            <nav>
                <ul className="space-y-4">
                    <li><a href="/dashboard" className="block hover:text-blue-600">Contracts</a></li>
                    <li><a href="#" className="block hover:text-blue-600">Insights</a></li>
                    <li><a href="#" className="block hover:text-blue-600">Reports</a></li>
                    <li><a href="#" className="block hover:text-blue-600">Settings</a></li>
                </ul>
            </nav>
        </div>
    );
}
