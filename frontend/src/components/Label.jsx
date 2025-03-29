import React from "react";

export function Label({ children, required }) {
  return (
    <div className="flex items-baseline justify-between">
      <div className="flex">
        <span className="block text-md font-medium text-gray-700">
          {children}
        </span>
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>
    </div>
  );
}