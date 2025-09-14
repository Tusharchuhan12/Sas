// src/components/UploadModal.jsx
import { useState } from "react";

export default function UploadModal({ onClose }) {
    const [files, setFiles] = useState([]);

    const handleFiles = (event) => {
        const selectedFiles = Array.from(event.target.files).map(file => ({
            name: file.name,
            status: "Uploading"
        }));
        setFiles(selectedFiles);

        selectedFiles.forEach((file, index) => {
            setTimeout(() => {
                setFiles(prev => prev.map((f, i) =>
                    i === index ? { ...f, status: "Success" } : f
                ));
            }, 1000 + Math.random() * 2000);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h3 className="text-lg font-bold mb-4">Upload Files</h3>
                <input type="file" multiple onChange={handleFiles} className="mb-4" />
                <ul>
                    {files.map((file, index) => (
                        <li key={index} className="flex justify-between items-center border-b py-2">
                            <span>{file.name}</span>
                            <span>{file.status}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Close</button>
            </div>
        </div>
    );
}
