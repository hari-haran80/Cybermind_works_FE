import { X } from "lucide-react";

export const CreateJobPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Create Job Posting</h2>
        <p>Your job posting form would go here...</p>
      </div>
    </div>
  );
};
