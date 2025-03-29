import React from "react";
import { Check, X } from "lucide-react";

export function SuccessMessage({ isOpen, onClose, title = "Berhasil!", message = "Aksi telah berhasil dilakukan.", type = "success" }) {
  if (!isOpen) return null;

  const messageStyles = {
    success: {
      iconColor: "bg-green-600",
      text: "text-green-600",
    },
    delete: {
      iconColor: "bg-red-600",
      text: "text-red-600",
    }
  };

  const { iconColor, text } = messageStyles[type];

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
          <div className={`${iconColor} rounded-full p-3 mb-4`}>
            <Check className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-xl font-medium ${text}`}>{title}</h3>
          <p className="text-gray-600 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
}
