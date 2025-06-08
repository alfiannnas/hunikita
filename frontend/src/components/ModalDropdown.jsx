import React, { useState } from "react";
import { Select } from "./Select";

export function ModalDropdown({
    title,
    message,
    options = [],
    onCancel,
    onConfirm,
    isOpen,
    defaultValue = "",
}) {
    const [selected, setSelected] = useState(defaultValue);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <Select
                    options={options}
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                    placeholder="Pilih status"
                    name="status"
                />
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(selected)}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={!selected}
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>
        </div>
    );
}
