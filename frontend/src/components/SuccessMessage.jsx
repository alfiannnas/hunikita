import React from "react";
import { Check, X } from "lucide-react";

export function SuccessMessage({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-12 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center">
          <div className="bg-red-600 rounded-full p-3 mb-4">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">Hapus Sukses</h3>
        </div>
      </div>
    </div>
  );
}