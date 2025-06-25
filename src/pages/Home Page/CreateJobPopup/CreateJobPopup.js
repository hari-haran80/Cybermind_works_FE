import { useState } from "react";
import { X } from "lucide-react";
import { createJob } from "../../../services/careerApi";
import toast, { Toaster } from "react-hot-toast";

export const CreateJobPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "Chennai",
    job_type: "Internship",
    min_monthly_salary: "",
    max_monthly_salary: "",
    application_deadline: "",
    job_description: "",
    requirements: "something",
    responsibilities: "something",
    experience: "1-3 Yr Exp",
    is_draft: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({ draft: false, publish: false });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits for salary fields
    if (
      (name === "min_monthly_salary" || name === "max_monthly_salary") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "job_title",
      "company_name",
      "location",
      "job_type",
      "min_monthly_salary",
      "max_monthly_salary",
      "application_deadline",
      "job_description",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.min_monthly_salary &&
      formData.max_monthly_salary &&
      parseInt(formData.min_monthly_salary) >
        parseInt(formData.max_monthly_salary)
    ) {
      newErrors.max_monthly_salary =
        "Max salary must be greater than min salary";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft) => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const key = isDraft ? "draft" : "publish";
    setLoading((prev) => ({ ...prev, [key]: true }));

    const payload = {
      ...formData,
      is_draft: isDraft,
      min_monthly_salary: parseInt(formData.min_monthly_salary),
      max_monthly_salary: parseInt(formData.max_monthly_salary),
    };

    try {
      await createJob(payload);
      toast.success(isDraft ? "Draft saved!" : "Job published successfully!");
      onClose();
    } catch (error) {
      console.error("Job creation failed:", error);
      toast.error("Job creation failed!");
    } finally {
      setLoading({ draft: false, publish: false });
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[1000px] flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
      <div className="bg-white h-[780px] p-6 rounded-xl shadow-lg w-[90%] max-w-[850px] relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h5 className="text-[24px] font-[700] text-center w-full">
          Create Job Opening
        </h5>

        {/* Job title and company */}
        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Job Title</label>
            <input
              name="job_title"
              type="text"
              value={formData.job_title}
              onChange={handleChange}
              className="w-[370px] p-3 border border-black rounded-md"
              placeholder="UI UX Designer"
            />
            {errors.job_title && (
              <span className="text-red-500 text-sm">{errors.job_title}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Company Name</label>
            <input
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
              className="w-[370px] p-3 border border-black rounded-md"
              placeholder="Amazon, Microsoft, Swiggy"
            />
            {errors.company_name && (
              <span className="text-red-500 text-sm">
                {errors.company_name}
              </span>
            )}
          </div>
        </div>

        {/* Location and job type */}
        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-[370px] p-3 border border-black rounded-md"
            >
              <option value="">Select Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
            {errors.location && (
              <span className="text-red-500 text-sm">{errors.location}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-[370px] p-3 border border-black rounded-md"
            >
              <option value="">Select Type</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.job_type && (
              <span className="text-red-500 text-sm">{errors.job_type}</span>
            )}
          </div>
        </div>

        {/* Salary range and deadline */}
        <div className="flex items-center justify-evenly mt-6">
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Salary Range</label>
            <div className="flex gap-3">
              <input
                name="min_monthly_salary"
                type="text"
                inputMode="numeric"
                value={formData.min_monthly_salary}
                onChange={handleChange}
                className="w-[183px] p-3 border border-black rounded-md"
                placeholder="Min Salary"
              />
              <input
                name="max_monthly_salary"
                type="text"
                inputMode="numeric"
                value={formData.max_monthly_salary}
                onChange={handleChange}
                className="w-[183px] p-3 border border-black rounded-md"
                placeholder="Max Salary"
              />
            </div>
            {errors.min_monthly_salary && (
              <span className="text-red-500 text-sm">
                {errors.min_monthly_salary}
              </span>
            )}
            {errors.max_monthly_salary && (
              <span className="text-red-500 text-sm">
                {errors.max_monthly_salary}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[600] text-[20px]">Application Deadline</label>
            <input
              name="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={handleChange}
              className="w-[370px] p-3 border border-black rounded-md"
            />
            {errors.application_deadline && (
              <span className="text-red-500 text-sm">
                {errors.application_deadline}
              </span>
            )}
          </div>
        </div>

        {/* Job description */}
        <div className="flex flex-col gap-1 mt-6 w-[95%] mx-auto">
          <label className="font-[600] text-[20px]">Job Description</label>
          <textarea
            name="job_description"
            rows="6"
            value={formData.job_description}
            onChange={handleChange}
            className="w-full p-3 border border-black rounded-md resize-none"
            placeholder="Describe the main responsibilities and role"
          ></textarea>
          {errors.job_description && (
            <span className="text-red-500 text-sm">{errors.job_description}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6 w-[95%] mx-auto">
          <button
            onClick={() => handleSubmit(true)}
            className="p-3 font-[600] text-[20px] border-2 border-black w-[230px] rounded-lg flex justify-center items-center gap-2"
            disabled={loading.draft}
          >
            {loading.draft ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              "Save Draft"
            )}
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="p-3 font-[600] text-[20px] text-white bg-[#00AAFF] w-[230px] rounded-lg flex justify-center items-center gap-2"
            disabled={loading.publish}
          >
            {loading.publish ? (
              <>
                <Spinner color="white" /> Publishing...
              </>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Spinner = ({ color = "black" }) => (
  <svg
    className="animate-spin h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    style={{ color }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    ></path>
  </svg>
);
